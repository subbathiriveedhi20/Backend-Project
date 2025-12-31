import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const securityMiddleware = (app) => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "*",
      credentials: true,
    })
  );

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );

  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
};
