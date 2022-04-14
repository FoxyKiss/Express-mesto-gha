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
    _id: '6257ccf96322c6fc565f10de',
  };

  next();
});

// ? Работа с роутами
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Адреса по вашему запросу не существует' });
});

// ? Запуск сервера
app.listen(PORT, () => {
});
