const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// ? Создать Порт и Express сервер
const { PORT = 3000 } = process.env;
const app = express();
// ? Подключение к DB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// ? Мидлвэр для добавления id пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '6256d182dc74c95a38fb82b0',
  };

  next();
});
module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

// ? Работа с роутами
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// ? Запуск сервера
app.listen(PORT, () => {
});

app.get('/', (req, res) => {
  res.send('Есть коннект');
});
