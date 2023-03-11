// not found
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    stack: err.stack,
  });
};
