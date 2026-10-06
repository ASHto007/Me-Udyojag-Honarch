/**
 * 404 Not Found Middleware
 */
export function notFound(req, res, _next) {
  res.status(404).json({
    success: false,
    message: `Resource not found at path: ${req.originalUrl}`,
  });
}

export default notFound;
