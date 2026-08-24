const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const env = require("./config/env");

const notFoundMiddleware = require("./middleware/notFound.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

if (env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "taskflow-api",
      timestamp: new Date().toISOString(),
    },
  });
});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;
