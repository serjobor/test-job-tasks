const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Middleware
// app.use(cors()); // Разрешаем CORS для всех доменов
app.use(express.json());

// Конфигурация CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/api/currencies', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/fiat/map?limit=15', {
    headers: {
      'X-CMC_PRO_API_KEY': API_KEY,
      'Accept': 'application/json'
    }
    });
    res.json(response.data.data);
  } catch (error) {
    console.error('Error:', error);
  }
});

app.get('/api/currencies/:currencies_symbol', async (req, res) => {
  try {
  const { currencies_symbol } = req.params;
  const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BTC&convert=${currencies_symbol}`, {
    headers: {
      'X-CMC_PRO_API_KEY': API_KEY,
      'Accept': 'application/json'
    }
    });

  const currencyName = Object.keys(response.data.data[0].quote)[0];
  const result = response.data.data[0].quote[currencyName];

  res.json(result);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Доступен по адресу: http://localhost:${PORT}`);
});