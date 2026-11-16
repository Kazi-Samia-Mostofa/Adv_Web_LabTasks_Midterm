# Lab Task 02 - Course Management REST API

Extends Lab Task 01 with DTO validation, pipes and course material uploads.
Uses the same NestJS module, controller, service and DTO pattern as the class examples.

## Run

Run these commands inside `adv_web_midterm_labtask2/CourseManagementAPI`:

```bash
npm install
npm run start:dev
```

Default URL: `http://localhost:3000`. The `PORT` environment variable can override it.
Nest creates `dist` when starting or building. It is ignored by Git.

## Structure

```text
src/
  course/
    dto/
      create-course.dto.ts
      update-course.dto.ts
    course.controller.ts
    course.service.ts
    course.module.ts
    upload-exception.filter.ts
  uploads/                    # Created automatically on upload, ignored by Git
  app.module.ts
  main.ts
postman/
  CourseManagementAPI.postman_collection.json
  fixtures/
```

## Routes

| Method | Route              | Result                               |
| ------ | ------------------ | ------------------------------------ |
| GET    | /course            | Message and empty data array         |
| GET    | /course/:id        | Message and course ID                |
| POST   | /course            | Message and validated course data    |
| PUT    | /course/:id        | Message, ID and updated data         |
| PATCH  | /course/:id        | Message, ID and updatedFields        |
| DELETE | /course/:id        | Message and deleted ID               |
| POST   | /course/:id/upload | Message, courseId, filename and path |

The service returns the response objects requested by the lab; no database or persistent course storage is required. PUT and PATCH both use UpdateCourseDto with PartialType, as instructed in the PDF.

## Request examples

POST `/course`, Body -> raw -> JSON:

```json
{
  "name": "NestJS Fundamentals",
  "code": "CS101",
  "instructor": "John Doe",
  "credits": 3,
  "description": "Optional course description"
}
```

Name, code and instructor must be nonempty strings. Whitespace-only strings are rejected. Credits must be a number between 1 and 6; a numeric string is converted to a number. Description is optional. Unknown fields produce HTTP 400.

PUT `/course/5` accepts the same fields. PATCH `/course/5` accepts a subset, for example:

```json
{ "name": "NestJS Advanced", "credits": 4 }
```

PATCH returns `updatedFields: ["name", "credits"]`.

For POST `/course/5/upload`, choose Body -> form-data, add key `file`, change its type to File, and select a JPG, JPEG, PNG or PDF file. Do not manually set Content-Type; Postman supplies the multipart boundary. Maximum size is 2MB (2 * 1024 * 1024 bytes). Files are stored in `src/uploads` with a timestamp prefix.

File extensions are checked by Multer fileFilter. A missing file or unsupported extension returns HTTP 400. Multer normally returns HTTP 413 for oversized files; the small upload exception filter converts this to HTTP 400 to match the lab's testing requirement.

## Postman verification

Import `postman/CourseManagementAPI.postman_collection.json` into Postman.
Set collection variable `fixtureDir` to the absolute path of this project's `postman/fixtures` folder, using forward slashes on Windows. Alternatively, select the corresponding local file manually in each upload request.

Before running the collection, generate the oversized test file from this project directory in PowerShell:

```powershell
$largeFile = Join-Path (Get-Location) 'postman/fixtures/large.pdf'
[System.IO.File]::WriteAllBytes($largeFile, (New-Object byte[] (2 * 1024 * 1024 + 1)))
```

This generated file is ignored by Git. `blocked.exe` is a harmless text fixture, not an executable program.

With the server running and the standalone Postman CLI installed:

```bash
postman collection run postman/CourseManagementAPI.postman_collection.json
```

The collection checks all seven routes, numeric conversion, optional description, empty and blank names, out-of-range and invalid credits, missing required fields, unknown fields, invalid updates, all four accepted extensions, rejected TXT/EXE uploads, oversized uploads and a missing upload.

Verified locally: 25 requests and 50 assertions passed using Postman CLI. Unit tests (3) and the existing root endpoint e2e test (1) also passed.

```bash
npm test
npm run test:e2e
```

No Git commit or GitHub push is performed automatically.
