"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
function AuthRouter(_a) {
    // router.post("/signup", authController.signup);
    var authController = _a.authController;
    return router;
}
exports.AuthRouter = AuthRouter;
