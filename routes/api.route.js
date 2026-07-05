const { verifyCaptcha } = require("../middleware/recaptcha.middleware");
const { Router } = require("express");
const apiRouter = Router();
const {
  Login,
  Register,
  checkAuth,
  logout,
} = require("../controllers/auth.controller");
const { authLimiter } = require("../middleware/rateLimit");

apiRouter.post("/auth/register", authLimiter, verifyCaptcha, Register);
apiRouter.post("/auth/login", authLimiter, verifyCaptcha, Login);
apiRouter.get("/auth/check", checkAuth);
apiRouter.post("/auth/logout", logout);
module.exports = { apiRouter };
