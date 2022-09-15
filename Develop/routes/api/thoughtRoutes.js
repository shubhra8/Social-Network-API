const router = require('express').Router();
const {
  getThought,
  getSingleThought,
 createThought,
 deleteThought,
 updateThought,
 getReactions,
 deleteReactions,
 } = require('../../controllers/thoughtController');
 // /api/thoughts
 router.route('/').get(getThought).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);



router.route('/:thoughtId/reactions').post(getReactions);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactions);
 module.exports = router;