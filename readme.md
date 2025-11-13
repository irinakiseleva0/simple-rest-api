# Simple REST API (Users + Cars)

A clean and modular REST API built with **Node.js**, **Express**, and **SQLite**, featuring:
- MVC architecture (Models, Services, Controllers)
- Environment-based configuration
- API Key authentication
- Auto database initialization + seeding
- Full example resources: **Users** + **Cars**

##  Project Structure

API/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── carController.js
│   ├── middleware/
│   │   ├── apiKey.js
│   │   └── logger.js
│   ├── models/
│   │   ├── User.js
│   │   └── Car.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── carRoutes.js
│   ├── services/
│   │   ├── userService.js
│   │   └── carService.js
│   └── index.js
│
├── .env
├── .env.example
├── .gitignore
├── database.sqlite
├── package.json
└── README.md

##  Installation

### 1. Clone the repository
git clone <your-repo-url>
cd API

### 2. Install dependencies
npm install

##  Environment Variables

Create a `.env` file in the project root:

PORT=3000
NODE_ENV=development
DATABASE_URL=./database.sqlite
API_KEY=your-secure-api-key-here
JWT_SECRET=your-jwt-secret-here
JWT_EXPIRES_IN=24h

##  Run the project

Development mode:
npm run dev

Production mode:
npm start

##  Database
- SQLite file: database.sqlite
- Tables auto-created on startup
- Seeded only in development

##  API Key Authentication

X-API-Key: your-api-key
Authorization: Bearer your-api-key

## API Endpoints

### Public Routes
GET /  
GET /health

### Protected Routes
/users  
/cars  

## Users fields
name, email

## Cars fields
make, model, year, color, price, mileage

##  Deploy to Render
Push repo → Create Web Service → Add ENV → Deploy

##  Example Requests

POST /users
{ "name": "Alice", "email": "alice@example.com" }

POST /cars
{ "make": "Tesla", "model": "Model 3", "year": 2022 }

##  Features
- Modular structure  
- API key protection  
- Users + Cars CRUD  
- SQLite database  
- Auto migration + seeding  

Made with love for learning.
