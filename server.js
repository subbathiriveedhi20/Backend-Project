import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./connection/connection.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { securityMiddleware } from "./middleware/security.js";

dotenv.config();

const app = express();

securityMiddleware(app);

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", routes);
app.use(errorHandler);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
