const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./midlewares/auth');
const { NotFoundError } = require('./errors/NotFoundError');

// ? Создать Порт и Express сервер
const { PORT = 3000 } = process.env;
const app = express();
// ? Подключение к DB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// ? Работа с роутами
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes/auth'));

app.use((req, res, next) => {
  next(new NotFoundError('Адреса по вашему запросу не существует'));
});
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
// ? Запуск сервера
app.listen(PORT, () => {
});
