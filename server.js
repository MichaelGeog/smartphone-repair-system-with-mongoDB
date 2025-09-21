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
import deviceRoute from "./routes/deviceRoute.js";
import issueRoute from "./routes/issueRoute.js";
import ticketRoute from "./routes/ticketRoute.js";
import ticketPageRoute from "./routes/ticketPageRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ES module helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/ping", (req, res) => {
  res.json({ message: "Server is working!" });
});

// API Routes
app.use("/api/brands", brandsRoute);
app.use("/api/devices", deviceRoute);
app.use("/api/issues", issueRoute);
app.use("/api/tickets", ticketRoute);

// Page route
app.use("/", ticketPageRoute);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection + Server Start
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log("Views =>", path.join(__dirname, "views"));
      console.log("Public =>", path.join(__dirname, "public"));
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
