const router = require('express').Router();
const {
  findAllUsers, findUserById, createUser, updateUserInfo, updateUserAvatar, login,
} = require('../controllers/users');

router.get('/', findAllUsers);

router.get('/:id', findUserById);

router.post('/signup', createUser);

router.post('/signin', login);

router.patch('/me', updateUserInfo);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
