## Educational Platform REST API
This project is a REST API built with Express for an educational platform. It includes user authentication, course and lecture management, and user profile handling with JWT-based security.

# Features
1. CORS and Security
CORS Requests: The API allows CORS requests to enable cross-origin resource sharing.
Security Headers: Security headers are added to the response object to enhance security.
2. Environment-Based Logging
Development Mode: Logs all requests to the console when NODE_ENV is set to development.
Production Mode: Logs all requests to a file named access.log when NODE_ENV is set to production.
3. User Management
   User Schema:
The schema includes fields for fullname, email, password, active status, and picture.
A guest picture is used as the default profile picture.
User Routes:
POST /users/signup: Users can sign up for a new account. Passwords are hashed before being stored.
POST /users/signin: Users can sign in, receiving a JWT containing their user ID, full name, email, and profile picture path.
POST /users/
/picture: Authenticated users can upload a new profile picture if they own the account.
DELETE /users/
/picture: Users can reset their profile picture to the guest picture if they own the account.
PATCH /users/
?action=deactivate_profile: Users can deactivate their account if they own the account.
4. Course and Lecture Management
   Course Schema:
The schema includes fields for title, description, created_by (user information), and an array of lectures.
Course Routes:
POST /courses: Authenticated users can add a new course, sending only the course title and description. User details are retrieved from the JWT.
GET /courses?action=all: Lists all courses from all users with pagination.
GET /courses?action=own: Lists all courses owned by the authenticated user with pagination.
GET /courses/:course_id: Retrieves a specific course by its course ID.
DELETE /courses/:course_id: Deletes a course by its ID if the authenticated user owns the course.
PUT /courses/:course_id: Updates the course title and description by course ID if the authenticated user owns the course.
5. Lecture Management
    Lecture Schema:
The schema includes fields for title, description, and url.
Lecture Routes:
POST /courses/
/lectures: Authenticated users can add a new lecture to a course if they own the course.
GET /courses/
/lectures: Lists all lectures of a course.
PUT /courses/
/lectures/:lecture_id: Updates a lecture's title, description, and URL if the authenticated user owns the course.
DELETE /courses/
/lectures/:lecture_id: Deletes a lecture if the authenticated user owns the course.
