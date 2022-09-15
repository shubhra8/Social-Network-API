const { ObjectId } = require('mongoose').Types;
const { User,Thought } = require('../models');

// const headCount = async () =>
//   User.aggregate()
//     .count('friendCount')
//     .then((numberOfFriends) => numberOfFriends);

module.exports = {
    getUser(req, res) {
        User.find()
      .then(async (users) => {
        const userObj = users;
        // headCount: await headCount(),
        
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
    // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // .select('-__v')
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              users,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
     createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
   // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: users.thoughts } })
      )
      .then(() => res.json({ message: 'User  deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  newfriend(req, res) {
   User.findOneAndUpdate({ _id: req.params.userId },{$push:{friends:req.params.friendId}}, { runValidators: true, new: true })
      .then((users) =>
                        !users
                            ? res.status(404).json({ message: 'No user found with this id' })
                            : res.json(users)
                    )
              
      .catch((err) => res.status(500).json(err));
  },
  //Delete Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:req.params.friendId } },
      { runValidators: true, new: true }
    )
     .then((users) =>
                        !users
                            ? res.status(404).json({ message: 'No user found with this id' })
                            : res.json(users)
                    )
              
      .catch((err) => res.status(500).json(err));
  }
}