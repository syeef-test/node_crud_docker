const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/", userController.getUsers);

router.get("/userId", userController.getUser);

router.post("/", userController.createUser);

router.put("/:userId", userController.updateUser);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
