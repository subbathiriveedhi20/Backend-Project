import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongosanitize from "express-mongo-sanitize";
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

  app.use(xss());
  app.use(mongosanitize());

  app.use(
    "/api",
    rateLimit({
      WindowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: "Too many requests, try again later",
      },
    })
  );
};
