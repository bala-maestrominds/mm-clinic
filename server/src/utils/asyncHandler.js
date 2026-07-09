// Wraps an async route handler so any thrown error (or rejected promise) is
// forwarded to Express's error-handling middleware instead of crashing the
// process or leaving the request hanging with no response.
//
// Usage:
//   router.get('/', asyncHandler(async (req, res) => { ... }));
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
