const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  deleteUser,
  updateUser,
 createUser,
 newfriend,
 deleteFriend,
 } = require('../../controllers/userController');

// /api/users
 router.route('/').get(getUser).post(createUser);

 // /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(newfriend).delete(deleteFriend);


 module.exports = router;