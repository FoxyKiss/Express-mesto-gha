const router = require('express').Router();
const { findAllUsers, findUserById, createUser } = require('../controllers/users');

router.get('/', findAllUsers);

router.get('/:id', findUserById);

router.post('/', createUser);

module.exports = router;
