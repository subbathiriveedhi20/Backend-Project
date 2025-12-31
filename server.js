import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
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

app.get("/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "DB not connected" });
  }
});

app.use("/api", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
