# 🚀 Real Estate Web Application

A fully responsive real estate web application developed with Angular for the front-end, utilizing Material UI and lazy loading for optimized performance. The backend is powered by Node.js, Express, and MongoDB, implementing Role-Based Access Control (RBAC) for secure user management. JWT authentication is used for token-based authorization, and an access log is implemented to track requests, improving system transparency and performance.

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
- **NodeMailer** – Email service for notifications and alerts

## Backend (Node.js + Express.js)

- **Express.ts** – Server-side framework for handling API requests
- **MongoDB** – NoSQL database for flexible data storage
- **Controllers & Routers** – Organized backend structure for clean API management
- **JWT** – SON Web Tokens for secure authentication and authorization
- **Stripe** – Integrated payment gateway for transaction handling

## 🌟 Features

✅ Access Log – Track incoming and outgoing requests for better monitoring

✅ Dynamic Routing – Lazy loading and smooth navigation with Angular Router

✅ Password Reset – Secure password reset functionality

✅ Optimized Performance – Efficient, clean, and maintainable code

✅ Reusable Components – Scalable architecture with reusable, modular components

✅ Role-Based Access Control (RBAC) – Secure role management with Angular Guards and backend integration

# 📂 Project Structure

```plaintext
/REAL-ESTATE
├── /client (Frontend - Angular)
│   ├── /.vscode
│   ├── /dist
│   ├── /node_modules
│   ├── /public
│   ├── /src
│   │   ├── /app
│   │   │   ├── /about
│   │   │   ├── /authenticate-users
│   │   │   ├── /contact
│   │   │   ├── /estate
│   │   │   ├── /home
│   │   │   ├── /properties
│   │   │   ├── /reviews
│   │   │   ├── /service-offered
│   │   │   ├── /payment
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
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
│   ├── /assets
│   ├── /helpers
│   ├── /node_modules
│   ├── /types
│   ├── /admin
│   │   ├── admin.controller.ts
│   │   ├── admin.route.ts
│   │   ├── admin.http.ts
│   ├── /estate
│   │   ├── estate.model.ts
│   │   ├── estate.controller.ts
│   ├── /payment
│   │   ├── payment.model.ts
│   │   ├── payment.controller.ts
│   ├── /profile
│   │   ├── user.profile.controller.ts
│   │   ├── user.profile.routes.ts
│   ├── /users
│   │   ├── user.controller.ts
│   │   ├── user.routes.ts
│   │   ├── user.model.ts
│   │   ├── user.http.ts
│   ├── .env
│   ├── .gitignore
│   ├── .access.log
│   ├── app.ts
│   ├── database_connect.ts
│   ├── jwt_type.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
├── README.md

```

# 🚀 Getting Started

## 1️⃣ Clone the Repository

git clone https://github.com/Sahrfear27/Portfolio-Website.git

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
npm run app

## 📨 Contact

If you have any questions or feedback, feel free to reach out:
💼 LinkedIn: https://www.linkedin.com/in/sahrfear-macarthy-9530a720a/
