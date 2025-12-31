import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import connectDB from "./connection/connection.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { securityMiddleware } from "./middleware/security.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

securityMiddleware(app);
app.use(express.json());
app.use(bodyParser.json());

/**
 * Health check
 * - App alive
 * - DB connection status
 */
app.get("/health", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.status(200).json({ status: "ok" });
  }
  return res.status(500).json({ status: "db not connected" });
});

app.use("/api", routes);
app.use(errorHandler);

/**
 * Start server ONLY after DB connects
 */
connectDB()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
    process.exit(1); // CRITICAL for Kubernetes
  });
