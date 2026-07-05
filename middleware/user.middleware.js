const jwt = require("jsonwebtoken");

const authorizationUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).send({ error: "توکن امنیتی یافت نشد" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).send({ error: "توکن امنیتی منقضی شده" });
    }
    req.userData = decode;
    next();
  } catch (error) {
    res.status(401).send({ error: "مشکل در توکن امنیتی" });
  }
};
module.exports = { authorizationUser };
