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
  const { _id } = req.user;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash, _id,
      })
        .then((user) => res.send({ data: user.email, _id }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(400).send({ message: 'Введены некорретные данные' });

            return;
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
