import { Router } from "express";
import type AuthControllers from "../modules/auth/auth-controllers.ts";
import { catchAsync } from "../utils/catch-async.ts";
import { bodyValidatorMiddleware } from "../middlewars/body-validator-middleware.ts";
import { checkUserEmail, checkUserPhone } from "../utils/check-user-login.ts";
import { isAuthenticated } from "../middlewars/auth-middleware.ts";
const router = Router();

export function AuthRouter({
  authController,
}: {
  authController: AuthControllers;
}) {
  const checkLoginAndPassword = bodyValidatorMiddleware({
    required: ["login", "password"],
    validate: [
      {
        field: "login",
        message: "Login must be email or phone",
        validateFn: (value) => {
          return checkUserEmail(value) || checkUserPhone(value);
        },
      },
      {
        field: "password",
        message: "Password must be at least 6 characters long",
        validateFn: (value) => value.length >= 6,
      },
    ],
  });

  router.post(
    "/signup",
    checkLoginAndPassword,
    catchAsync(authController.signup),
  );

  router.post(
    "/signin",
    checkLoginAndPassword,
    catchAsync(authController.signin),
  );

  router.get("/logout", isAuthenticated, catchAsync(authController.logout));
  router.get("/info", isAuthenticated, catchAsync(authController.getId));
  router.post("/signup/new-token", catchAsync(authController.newToken));
  return router;
}
