const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middlewares/verifyToken');


router
    .post("/register", userController.registerUser)
    .get("/login", userController.loginUser)
    .get("/:id", auth, userController.getUsers)
    .put("/:id", auth, userController.updateUser)
    .delete("/:id", auth, userController.deletedUser)

module.exports = router;