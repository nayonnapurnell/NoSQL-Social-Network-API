const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {

// Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
     // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'User created but no user with this id!' })
          : res.json({ message: 'User successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete a friend
  deleteFriend(req, res) {
   User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { new: true }
     ).then((user) =>
        !user
          ? res.status(404).json({
              message: 'User not found',
            })
          : res.json({ message: 'Friend successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create a friend
  createFriend(req, res) {
    User.findOneAndUpdate(
               { _id: req.params.userId },
               { push: { friends: req.params.friendId } },
               { new: true }
      ).then((user) =>
         !user
           ? res.status(404).json({
               message: 'User not found',
             })
           : res.json({ message: 'Friend successfully added' })
       )
       .catch((err) => {
         console.log(err);
         res.status(500).json(err);
       });
   },
}