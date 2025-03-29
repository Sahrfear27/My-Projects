# 🚀 Drug App

This project is a web application designed to help users review and report medication side effects. It features guest browsing, user authentication, and role-based permissions for managing medications and reviews.

# 🛠️ Tech Stack

## Frontend (Angular + TypeScript)

- **Angular** – Component-based architecture for scalable applications
- **TypeScript** – Strongly-typed JavaScript for improved code quality
- **Signals** – Reactive state management
- **Angular Router & Guards** – Role-based access control (RBAC) and client-side navigation
- **Dependency Injection** – Efficient management of services and API requests
- **Angular Material** – UI components and layout styling
- **Toasta** – Small pop-up notifications for better user experience
- **Encapsulation** – Avoiding style conflicts within components
- **Pipes & Directives** – Custom functionality to transform data in templates

## Backend (Node.js + Express.js)

- **Express** – Server-side framework for handling API requests
- **MongoDB** – NoSQL database for flexible data storage
- **Controllers & Routers** – Organized backend structure for clean API management
- **JWT** – SON Web Tokens for secure authentication and authorization

## 🌟 Features

✅ OOP - Utilize Object Oriented programming principle such Encapsulation that minimize style conflict within the application

✅ Guest Browsing - Browse Medications by First Letter: Guests can view medications by selecting an alphabet letter.

✅ Lazy Loading: User-protected components are implemented with proper lazy-loading techniques to optimize performance.

✅ User Authentication- Signup and Signin: Users need to create an account and sign in to add, update, or delete medications and reviews. Authentication is handled using JWT (JSON Web Token).

✅ State Management- All component and service state properties are declared as a signal.

✅ Reusable Components – Scalable architecture with reusable, modular components

✅ Role-Based Access Control (RBAC) – Secure role management with Angular Guards and backend integration

✅ Forms Handling- The application uses ReactiveFormsModule for form elements, ensuring a data-driven approach.

# 📂 Project Structure

```plaintext
/Drug App
├── /client (Frontend - Angular)
│   ├── /.vscode
│   ├── /dist
│   ├── /node_modules
│   ├── /public
│   ├── /src
│   │   ├── /Environments
│   │   ├── /app
│   │   │   ├── /authenticate-users
│   │   │   ├── /Guards
│   │   │   ├── /Medication
│   │   │   ├── /Review
│   │   │   ├── /Routes
│   │   │   ├── /Services
│   │   │   ├── /Types
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── styles.css
│   ├── .editorconfig
│   ├── .gitignore
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.spec.json

├── /server (Backend - Node.js/Express)
│   ├── /Upload
│   ├── /Medications
│   │   ├── medication.controller.js
│   │   ├── medication.model.js
│   │   ├── medication.router.js
│   │   ├── medication.test.http
│   ├── /Users
│   │   ├── user.controller.js
│   │   ├── user.middleware.js
│   │   ├── user.model.js
│   │   ├── user.router.js
│   │   ├── user.test.http
│   ├── .env
│   ├── .gitignore
│   ├── error.js
│   ├── server.js
│   ├── package-lock.json
│   ├── package.json
├── README.md

```

# 🚀 Getting Started

## 1️⃣ Clone the Repository

git clone https://github.com/Sahrfear27/My-Projects/tree/main/Drug-App

## 2️⃣ Install Dependencies

### FrontEnd

cd client
npm install

### Backend

cd server
npm install

## 3️⃣ Run the Project

### Start the Frontend

cd client
ng serve -o

### Start the Backend

cd Server
npm run start

## 📨 Contact

If you have any questions or feedback, feel free to reach out:
💼 LinkedIn: https://www.linkedin.com/in/sahrfear-macarthy-9530a720a/
