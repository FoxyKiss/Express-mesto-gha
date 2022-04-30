const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { validateUrl } = require('../utils/validateUrl');
const {
  findAllUsers, findUserById, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', findAllUsers);

router.get('/me', getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), findUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateUserAvatar);

module.exports = router;
