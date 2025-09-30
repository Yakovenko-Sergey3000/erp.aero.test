export function setTokenServiceMiddleware(tokenService) {
  return (req, res, next) => {
    req.tokenService = tokenService;
    next();
  };
}
