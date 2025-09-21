// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Middleware
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// Routes
import brandsRoute from "./routes/brandsRoute.js";
import deviceRoute from "./routes/deviceRoute.js";
import issueRoute from "./routes/issueRoute.js";
import ticketRoute from "./routes/ticketRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Test route
app.get("/ping", (req, res) => {
  res.json({ message: "Server is working!" });
});

// API Routes
app.use("/api/brands", brandsRoute);
app.use("/api/devices", deviceRoute);
app.use("/api/issues", issueRoute);
app.use("/api/tickets", ticketRoute);

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
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
