🏬 Store Rating Application

A full-stack web application that allows users to rate registered stores, with role-based access for System Administrators, Store Owners, and Normal Users.
This project was built as part of a Full-Stack Intern coding challenge.

✨ Features Overview
🔐 Authentication & Authorization

Single login system for all users

JWT-based authentication

Role-based access control (Admin, User, Store Owner)

👤 User Roles & Capabilities
🧑‍💼 System Administrator

View dashboard with:

Total users

Total stores

Total ratings

Add new users (Admin / User / Store Owner)

Add new stores and assign store owners

View and filter:

Users (by name, email, role)

Stores (by name, email, rating)

Secure logout

👤 Normal User

Sign up and log in

View all registered stores

Search stores by name or address

Submit ratings (1–5)

Update previously submitted ratings

Secure logout

🏪 Store Owner

Log in securely

View dashboard showing:

Their store

Average rating

Users who submitted ratings

Secure logout

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router

Backend

Node.js

Express.js

JWT Authentication

bcrypt

Database

PostgreSQL

🗂 Database Tables

"User" – stores user details and roles

"Store" – stores store details and owner mapping

"Rating" – stores user ratings for stores

🔑 Sample Login Credentials (For Testing)

You can use the following accounts to test the complete workflow:

🧑‍💼 Admin
Email: test@example.com
Password: Admin@123

🏪 Store Owner
Email:    owner@example.com
Password: Owner@123


👤 Normal User
Email: user@example.com
Password: User@123


Note: Passwords are stored securely using bcrypt hashing.

🚀 How to Run the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/Avishkar014/Store-rating-app.git
cd Store-rating-app

2️⃣ Backend Setup
cd backend
npm install
npm start


Server runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


App runs on:

http://localhost:5173

🔄 Application Flow
Login
 ├─ ADMIN → Admin Dashboard
 │          ├─ Manage Users
 │          ├─ Manage Stores
 │          └─ View Metrics
 │
 ├─ USER → Store Listing
 │         ├─ Search Stores
 │         ├─ Rate Store
 │         └─ Update Rating
 │
 └─ STORE OWNER → Owner Dashboard
            ├─ Average Rating
            └─ User Ratings List

📌 Best Practices Followed

Clean REST API structure

Secure password hashing

Role-based route protection

Reusable UI components

Database normalization

Proper error handling

📎 GitHub Repository

🔗 https://github.com/Avishkar014/Store-rating-app

🙌 Author

Avishkar Tambe
