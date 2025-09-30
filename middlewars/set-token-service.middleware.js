export const setTokenServiceMiddleware = (tokenService) => (req, res, next) => {
  req.tokenService = tokenService;
  next();
};
