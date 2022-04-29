const router = require('express').Router();
const {
  findAllUsers, findUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', findAllUsers);

router.get('/:id', findUserById);

router.patch('/me', updateUserInfo);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
