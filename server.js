// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Middleware
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// Routes
import brandsRoute from "./routes/brandsRoute.js";
import appleRoute from "./routes/appleRoute.js";
import issuesRoute from "./routes/issuesRoute.js";
import ticketsRoute from "./routes/ticketsRoute.js";
import ticketsPageRoute from "./routes/ticketsPageRoute.js";

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// EJS + Static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/brands/apple/issues", issuesRoute);
app.use("/api/brands/apple", appleRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/tickets", ticketsRoute);
app.use("/", ticketsPageRoute);

// Test route to confirm server is running
app.get("/ping", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
