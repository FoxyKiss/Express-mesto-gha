const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function findAllUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function findUserById(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорретный Id' });

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) return res.status(400).send({ message: 'Email или пароль не могут быть пустыми' });

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.send({ data: user.email }))
        .catch((err) => {
          if (err.code === 11000) {
            return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
          }
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Введены некорретные данные' });
          }
          res.status(500).send({ message: 'Произошла ошибка' });
        });
    });
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорретные данные' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорретный Id' });
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорретные данные' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорретный Id' });
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
}

module.exports = {
  findAllUsers, findUserById, createUser, updateUserInfo, updateUserAvatar, login,
};
