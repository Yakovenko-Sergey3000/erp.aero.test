import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../configs/config.js";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

    req.user = {
      id: decoded.id,
    };

    const refreshToken = await req.tokenService.getTokenByUserId(
      req.user.id,
      req.ip,
    );

    if (!refreshToken) {
      return res.status(401).send("Unauthorized");
    }

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).send("Unauthorized");
  }
};
