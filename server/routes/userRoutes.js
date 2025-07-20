const { Register , Login, CheckLogin } = require('../controllers/userControllers');
const userAuth = require('../middleware/userAuth');
const UserRouter = require('express').Router();

UserRouter.get("/check" , userAuth , CheckLogin);
UserRouter.post("/register" , Register);
UserRouter.post("/login" , Login);

module.exports = UserRouter;
