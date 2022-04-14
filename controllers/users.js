const User = require('../models/user');


const ERROR_CODE = 400;

function findAllUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function findUserById(req, res) {
  User.findById(req.params._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if(err.name === 'CastError') {
        res.status(404).send({message: 'Пользователь не найден'})

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Введены некорретные данные'})

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })
    });;
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.params._id,
    { name, about },
    {
      new: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Введены некорретные данные'})

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })
    });;
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.params._id,
    { avatar },
    {
      new: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Введены некорретные данные'})

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })
    });;
}

module.exports = {
  findAllUsers, findUserById, createUser, updateUserInfo, updateUserAvatar,
};
