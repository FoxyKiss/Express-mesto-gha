const Card = require('../models/card');

function findAllCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорретные данные' });

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка  не найдена' });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный Id' });

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(404).send({ message: 'Переданный id не найден' });
      }
      res.send({ data: like });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный Id' });

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        res.status(404).send({ message: 'Переданный id не найден' });
      }
      res.send({ data: like });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорретный Id' });

        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports = {
  findAllCards, createCard, deleteCard, likeCard, dislikeCard,
};
