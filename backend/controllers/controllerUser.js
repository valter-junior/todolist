const User = require('../models/user');


const createUser = async (req, res) => {
    try {
      const user = await User.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        login: req.body.login,
        password: req.body.password

      });
      return res.status(201).json({
        user,
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'login', 'password']
      });
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({
        where: { todo_id: id }
      });
      if (deleted) {
        return res.status(200).json({"msg": "User deleted"});
      }
      throw new Error("Note not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };



  module.exports = {
      getAllUsers,
      createUser,
      deleteUser
  }