# TaskFlow API --- Manual Testing Guide

1. Purpose

This document defines the manual API testing strategy for the TaskFlow
backend
Testing is performed using Postman against the REST API. The goal is to
verify:

- Authentication and JWT handling
- Role-based authorization (RBAC)
- User management
- Validation and error handling
- Business rules
- API status codes and response structure
- Negative and edge cases
- Data integrity after write operations

This document is for who needs to validate the API without reading the entire codebase

2. Testing Scope

`Currently covered:-`

- User registration
- User login
- JWT authentication
- Protected routes
- Role-based authorization
- Get user
- Get users
- Delete user
- Update user
- Global error handling
- Input validation
- Duplicate email prevention
- Password hashing
- Last-admin protection
- Self-delete protection
- Role-based update restrictions

 Not covered yet

`` The following features are planned for later phases:``

- Task management
- File uploads
- Cloud storage
- Search and filtering
- Pagination
- Caching
- Background jobs
- Automated tests (Jest/Supertest)
- MongoDB transactions
- Concurrency/race-condition testing

3. Test Environment

Requirements-

- Node.js
- MongoDB
- TaskFlow API running locally
- Postman
- A clean/test MongoDB database

Start the application : npm run dev

Verify that:

- MongoDB connection succeeds
- Express server starts
- No TypeScript/runtime errors are present

Base URL : http://localhost:5000

Adjust the port if the application is configured differently.

4. Roles

TaskFlow currently has three roles:

Role       Purpose

Admin      Full user-management access
Manager    Employee-management access
Employee   Own-profile access

5. Authentication Testing

`AUTH-01 --- Register user successfully`

Request : POST /users/register

Body

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "role": "Admin",
  "isActive": true
}

Expected : 

Status: 201 Created
A user should be created successfully.

Verify in MongoDB:

- User exists
- Email is correct
- Password is hashed
- Role is correct
- isActive is correct

` AUTH-02 --- Register with missing name `

Remove name.

Expected

400 Bad Request
Name is required

` AUTH-03 --- Register with missing email `

Expected

400 Bad Request
Email is required

` AUTH-04 --- Register with invalid email `

Example:

{
  "email": "invalid-email"
}

Expected

400 Bad Request
Invalid Email Format

` AUTH-05 --- Register with weak password `

Example:

{
  "password": "password"
}

Expected

400 Bad Request

Password policy should be enforced.

` AUTH-06 --- Register with invalid role `

Example:

{
  "role": "Developer"
}

Expected

400 Bad Request
Role must be Admin, Manager or Employee

` AUTH-07 --- Duplicate email registration `

Register a user using an email that already exists.

Expected

409 Conflict
User Already Exists

6. Login Testing

` LOGIN-01 --- Valid credentials `

POST /users/login

Expected

200 OK

Response should contain a JWT.

Do not expose or return the plaintext password.

` LOGIN-02 --- Wrong password `

Use an existing email with an incorrect password.

Expected

401 Unauthorized

` LOGIN-03 --- Non-existing email `

Expected

401 Unauthorized

` LOGIN-04 --- Missing credentials `

Test missing email and/or password.

Expected

400/401

according to the API's defined validation behavior.

7. JWT Authentication Testing

Protected endpoints require:

Authorization: Bearer <token>

` JWT-01 --- Valid token `

Use a valid token obtained from login.

Expected

Request reaches the protected endpoint.

` JWT-02 --- Missing Authorization header `

Remove:

Authorization: Bearer <token>

Expected

401 Unauthorized

` JWT-03 --- Malformed Authorization header `

Examples:

Authorization: token

Authorization: Basic abc

Authorization: Bearer

Expected

401 Unauthorized

` JWT-04 --- Invalid token `

Use a modified/random token.

Expected

401 Invalid token

` JWT-05 --- Expired token `

Use an expired JWT.

Expected

401 Token has expired

8. RBAC Testing

The following tests verify that the authorization middleware enforces
the role passed to the route.

` RBAC-01 --- Admin access `

Admin accesses an Admin-only endpoint.

Expected

Allowed

` RBAC-02 --- Manager accessing Admin-only endpoint `

Expected

403 Forbidden

` RBAC-03 --- Employee accessing Admin-only endpoint `

Expected

403 Forbidden

9. Get User Testing

` GET-USER-01 --- Admin gets a user `

GET /users/:id
Authorization: Bearer <admin-token>

Expected

200 OK

Verify:

Correct user is returned

Password is not returned

` GET-USER-02 --- Manager accessing Admin-only get-user endpoint `

Expected

403 Forbidden

` GET-USER-03 --- Employee accessing Admin-only get-user endpoint `

Expected

403 Forbidden

` GET-USER-04 --- Non-existing user `

Use a valid-looking but non-existing ID.

Expected

404 User not found

10. Get All Users Testing

Current route: GET /users

Allowed roles:
- Admin
- Manager

Admin behavior : Admin should receive all users.

Manager behavior : Manager should receive employees according to the currently implemented
business rule.

Employee behavior : Employee should not be allowed.

Expected: 403 Forbidden

11. Delete User Testing

Current route: DELETE /users/:id

Allowed role: Admin

` DELETE-01 --- Admin deletes another user `
Expected : 200 OK

Verify the user no longer exists in MongoDB.

` DELETE-02 --- Manager attempts deletion `
Expected : 403 Forbidden

` DELETE-03 --- Employee attempts deletion `
Expected : 403 Forbidden

` DELETE-04 --- Admin tries to delete own account `
Expected : 403
You cannot delete your own account

` DELETE-05 --- Delete non-existing user `
Expected : 404 User not found

` DELETE-06 --- Delete the last Admin `
If only one Admin exists, attempt to delete that Admin.
Expected : 403
Cannot delete the last admin
This verifies the last-admin business rule.

12. Update User Testing

Current route: PATCH /users/:id

Allowed roles:
- Admin
- Manager
- Employee

The allowed fields depend on the authenticated user's role.

12. 1 Admin Update Rules

Admin can update:

- name
- email
- role
- isActive

` UPDATE-ADMIN-01 --- Update name `

{
  "name": "Updated Name"
}

Expected: 200 OK

` UPDATE-ADMIN-02 --- Update email `

Use a valid, unused email.

Expected: 200 OK

` UPDATE-ADMIN-03 --- Change role `

Example:

{
  "role": "Manager"
}

Expected: 200 OK

` UPDATE-ADMIN-04 --- Change isActive `

Example:

{
  "isActive": false
}

Expected: 200 OK

` UPDATE-ADMIN-05 --- Attempt password update `

{
  "password": "NewPassword@123"
}

Expected: 400

Password must be handled by a dedicated password-change flow.

` UPDATE-ADMIN-06 --- Invalid email `

{
  "email": "invalid-email"
}

Expected: 400 Invalid Email Format

` UPDATE-ADMIN-07 --- Duplicate email `

Use another existing user's email.

{
  "email": "existing@example.com"
}

Expected: 409 Email already exists

The target user is allowed to keep their own existing email.

` UPDATE-ADMIN-08 --- Unknown field `

{
  "password": "abc"
}

Expected: 400
password cannot be updated

12. 2  Manager Update Rules

Manager can update only Employees.

Allowed fields:

- name
- email

` UPDATE-MANAGER-01 --- Update employee name `

Expected: 200 OK

` UPDATE-MANAGER-02 --- Update employee email `

Expected: 200 OK

` UPDATE-MANAGER-03 --- Update Manager `

Expected: 403
Manager can only update employees

` UPDATE-MANAGER-04 --- Update Admin `

Expected: 403
Manager can only update employees

` UPDATE-MANAGER-05 --- Change employee role `

{
  "role": "Manager"
}

Expected: 403

` UPDATE-MANAGER-06 --- Change isActive `

{
  "isActive": false
}

Expected: 403

12. 3) Employee Update Rules

Employee can update only their own profile

Allowed fields:

- name
- email

` UPDATE-EMPLOYEE-01 --- Update own name `

Expected: 200 OK

` UPDATE-EMPLOYEE-02 --- Update own email `

Expected: 200 OK

` UPDATE-EMPLOYEE-03 --- Update another user's profile `

Use another user's ID in the URL.

Expected: 403
You can only update your own profile

` UPDATE-EMPLOYEE-04 --- Change own role `

{
  "role": "Admin"
}

Expected: 403

` UPDATE-EMPLOYEE-05 --- Change own isActive `

{
  "isActive": false
}

Expected: 403

13. Input and Edge-Case Testing

For protected endpoints, test:

Empty body {}

Verify the API handles it according to the intended update contract.

Invalid user ID : /users/invalid-id

Expected behavior should be a controlled client error, not a server
crash.

Non-existing ID : /users/507f1f77bcf86cd799439011

Expected: 404

if the ID is valid but no user exists.

Unexpected fields

{
  "randomField": "test"
}

Expected: 400

for update routes where the field is not allowed

Multiple fields

Example:

{
  "name": "Updated",
  "email": "updated@example.com"
}

Verify that all permitted fields update together.

14. Error Handling Verification

The API should not expose raw stack traces or internal database errors
to clients.

Verify that errors are converted into the application's standard error
response.

Test:

- Missing authentication
- Invalid JWT
- Expired JWT
- Invalid role
- Invalid user ID
- User not found
- Duplicate email
- Invalid email
- Forbidden operation
- Invalid update field

15. Database Verification

After every successful write operation, verify the database state.

` Registration `

Check:

- User created
- Password hashed
- Correct role
- Correct active state

` Update `

Check:

- Only requested fields changed
- Password did not change through profile update
- Role restrictions were respected
- Email uniqueness was preserved

` Delete `

Check:

- User is actually removed
- Other users remain unaffected

16. Test Data

Maintain dedicated test users.

Example:

User         Role       Purpose

Admin A      Admin      Admin tests
Admin B      Admin      Multiple-admin tests
Manager A    Manager    Manager tests
Employee A   Employee   Employee/self tests
Employee B   Employee   Cross-user authorization tests

Using separate test users makes authorization scenarios reproducible.

17. Recommended Test Execution Order

Run tests in this order:

1. Server / database health
2. Registration
3. Login
4. JWT authentication
5. RBAC
6. Get user
7. Get all users
8. Update user
9. Delete user
10. Negative/edge cases
11. Database verification

For each feature, test:

Happy path
    ↓
Unauthorized request
    ↓
Forbidden request
    ↓
Invalid input
    ↓
Non-existing resource
    ↓
Edge case

18. Test Result Tracking

Use the following format while executing tests:

Test ID           Test                  Expected   Actual   Status

AUTH-01           Register valid user   201        201      PASS
AUTH-02           Missing name          400        400      PASS
LOGIN-01          Valid login           200        200      PASS
JWT-02            Missing token         401        401      PASS
UPDATE-ADMIN-01   Update name           200        200      PASS

Use:

PASS --- expected behavior observed

FAIL --- actual behavior differs

BLOCKED --- cannot execute because a dependency is unavailable

19. Defect Reporting Format

If a test fails, record:

` Title `

Short description of the problem.

Steps to reproduce : -

1. Login as Manager
2. Copy JWT
3. Send PATCH request
4. Target Admin user

Expected : 403 Forbidden

Actual : 200 OK

Severity :Critical , High , Medium , Low

Evidence

Attach:

Postman request

Response

Relevant logs

Database state if applicable

20. Definition of Done --- Manual API Testing

The current backend feature set is considered manually verified when:

All happy-path tests pass
Authentication tests pass
Authorization/RBAC tests pass
Validation tests pass
Negative tests pass
Edge cases are checked
Database state is verified after writes
No unexpected server crash occurs
No password is exposed in API responses
Failed tests are fixed and re-tested
Final test results are recorded