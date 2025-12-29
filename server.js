import express from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./connection/connection.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", routes);

connectDB().catch((err) => {
  console.error("MongoDB connection error:", err);
});

export const handler = serverless(app);
