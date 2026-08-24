const env = require("../config/env");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message:
        statusCode === 500 && env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message || "Something went wrong",
    },
  };

  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
