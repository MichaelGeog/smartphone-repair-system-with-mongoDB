# Smartphone Repair Management System

This project is a **full-stack Node.js, Express.js, and MongoDB web application** for managing smartphone repair tickets.  
It allows users to create, view, and manage repair tickets with details such as customer information, device type, issue type, and pricing.  

The app uses:
- **Express.js** for building REST APIs and serving pages
- **MongoDB Atlas** for database storage
- **EJS** for server-side rendering of the frontend
- **CSS** for a clean and responsive UI

## ✨ Features

- **Brands Management**: Add, update, view, and delete smartphone brands (Apple, Samsung, Google, etc.).  
- **Devices Management**: Manage devices by brand (e.g., iPhone models for Apple).  
- **Issues Management**: Define repair issues (screen cracked, battery replacement, charging port, etc.) with pricing.  
- **Tickets Management**: Create and manage repair tickets with customer details, device, issue, and price.  
- **Dynamic Pricing**: Ticket price is automatically resolved from the issue database.  
- **Frontend UI**: EJS-based form and table for creating and viewing tickets.  
- **REST API**: Full CRUD API for brands, devices, issues, and tickets.  
- **MongoDB Integration**: All data is persisted in MongoDB Atlas (cloud database).  
- **Middleware**: Custom logger and centralized error handling.  

## 🛠 Tech Stack

**Backend**  
- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  

**Database**  
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)  
- [Mongoose](https://mongoosejs.com/) for schema modeling  

**Frontend**  
- [EJS](https://ejs.co/) (Embedded JavaScript Templates)  
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)  

**Tools & Utilities**  
- [Nodemon](https://www.npmjs.com/package/nodemon) (development server auto-restart)  
- [dotenv](https://www.npmjs.com/package/dotenv) (environment variables)  
- Git & GitHub for version control  
