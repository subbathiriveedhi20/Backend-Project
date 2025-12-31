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

// Connect to DB once at startup
connectDB();

securityMiddleware(app);

app.use(express.json());
app.use(bodyParser.json());

// Health check only reads DB status
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState; // 1 = connected
  if (dbState === 1) {
    res.status(200).json({ status: "ok" });
  } else {
    res.status(500).json({ status: "error", message: "DB not connected" });
  }
});

app.use("/api", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
