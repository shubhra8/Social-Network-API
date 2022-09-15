const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = thoughts
        //   headCount: await headCount(),
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
     createThought(req, res) {
    Thought.create(req.body)
      // .then((thought) => res.json(thought))
      .then((thought) =>User.findOneAndUpdate({ _id: req.body.userId },{$push:{thoughts:thought._id}}))
      .then((thought) =>
                        !thought
                            ? res.status(404).json({ message: 'No user found with this id' })
                            : res.json(thought)
                    )
              
      .catch((err) => res.status(500).json(err));
  },
   // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // .select('-__v')
      .then(async (thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thoughts,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
   // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.findOneAndUpdate(
              {username: { $in: thoughts.username } },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then(() => res.json({ message: ' Thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Add Reaction to thought
  getReactions(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Delete Reactions
  deleteReactions(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId }  } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No Reactions found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
}