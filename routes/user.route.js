const {Router} = require('express')
const { changePassword } = require('../controllers/user.controller')
const { changePasswordLimiter } = require('../middleware/rateLimit')
const userRouter = Router()

userRouter.patch("/changePassword",changePasswordLimiter,changePassword)
module.exports = {userRouter}