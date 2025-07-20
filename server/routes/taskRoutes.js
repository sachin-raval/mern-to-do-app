const { Read , AddTask , DoneTaskToggle , Update , Delete } = require('../controllers/taskControllers');
const userAuth = require('../middleware/userAuth');

const Router = require('express').Router();

Router.get("/read" , userAuth , Read);
Router.post("/add" , userAuth , AddTask);
Router.patch("/:id/done" , userAuth , DoneTaskToggle);
Router.put("/:id/update" , userAuth , Update);
Router.delete("/:id/delete" , userAuth , Delete);

module.exports = Router;