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

apiRouter.post("/register", authLimiter, verifyCaptcha, Register);
apiRouter.post("/login", authLimiter, verifyCaptcha, Login);
apiRouter.get("/check", checkAuth);
apiRouter.post("/logout", logout);
module.exports = { apiRouter };
