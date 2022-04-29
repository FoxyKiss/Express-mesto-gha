const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./midlewares/auth');
// ? Создать Порт и Express сервер
const { PORT = 3000 } = process.env;
const app = express();
// ? Подключение к DB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// ? Работа с роутами
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes/auth'));

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Адреса по вашему запросу не существует' });
});

// ? Запуск сервера
app.listen(PORT, () => {
});
