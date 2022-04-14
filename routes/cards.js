const router = require('express').Router();
const { findAllCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', findAllCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

module.exports = router;
