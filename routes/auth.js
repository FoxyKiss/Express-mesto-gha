const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUser, login,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.post('/signin', login);

module.exports = router;
