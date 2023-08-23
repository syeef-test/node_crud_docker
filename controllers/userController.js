const userModel = require("../models/userModel");

// CRUD controllers

// get all users
exports.getUsers = (req, res, next) => {
  userModel
    .findAll()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => console.log(err));
};

// get user by id
exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No User Found" });
      } else {
        res.status(200).json({ user: user });
      }
    })
    .catch((err) => console.log(err));
};

// create user
exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;

  console.log(name, email);

  userModel
    .create({ name: name, email: email })
    .then((user) => {
      console.log("user created");
      res
        .status(201)
        .json({ message: "User created successfully", user: user });
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ message: "User creation failed" });
    });
};

// update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId; // Changed "id" to "userId" for consistency
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;

  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No User Found" });
      }
      user.name = updatedName;
      user.email = updatedEmail;
      return user.save(); // Return the Promise to the next then block
    })
    .then((updatedUser) => {
      res.status(200).json({ message: "User Updated", user: updatedUser });
    })
    .catch((err) => console.log(err));
};

// delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No User Found" });
      } else {
        return userModel.destroy({ where: { id: userId } });
      }
    })
    .then((result) => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => console.log(err));
};
