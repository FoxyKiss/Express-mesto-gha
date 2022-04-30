const mongoose = require('mongoose');
const { validateUrl } = require('../utils/validateUrl');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: { validator: validateUrl, message: 'Введите валидную ссылку' },
  },

  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  likes: [{
    type: mongoose.Types.ObjectId,
    required: true,
    default: [],
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
