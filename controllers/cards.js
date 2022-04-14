const Card = require('../models/card');

function findAllCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.id)
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = { findAllCards, createCard, deleteCard };
