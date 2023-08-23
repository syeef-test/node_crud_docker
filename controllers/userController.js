const userModel = require("../models/userModel");

//CRUD controllers

//get all user
exports.getUsers = (req, res, next) => {
  userModel
    .findAll()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => console.log(err));
};

//get users by id

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No User Found" });
      }
      res.status(200).json({ user: user });
    })
    .catch((err) => console.log(err));
};

//create user

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;

  userModel
    .create({ name: name, email: email })
    .then((result) => {
      console.log("user created");
      res
        .status(201)
        .json({ message: "User created succesfully", user: result });
    })
    .catch((err) => console.log(err));
};

//update user

exports.updateUser = (req, res, next) => {
  const userId = req.params.id;
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
      return user.save();
    })
    .then((result) =>
      res.status(200).json({ message: "User Updated", user: result })
    )
    .catch((err) => console.log(err));
};

//delete user

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No User Found" });
      }
      return userModel.destroy({ where: { id: userId } });
    })
    .then((result) =>
      res.status(200).json({ message: "User deleted succesfully" })
    )
    .catch((err) => console.log(err));
};
