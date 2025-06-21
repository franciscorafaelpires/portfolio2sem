require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Importa os dados estáticos do portfólio
const portfolioData = require('./portfolioData');

// para usar o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// usando os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rotas para as páginas do portfólio
app.get('/', (req, res) => {
  res.render('index', { portfolio: portfolioData });
});

app.get('/curriculum', (req, res) => {
  res.render('curriculum', { portfolio: portfolioData });
});

app.get('/projects', (req, res) => {
  res.render('projects', { portfolio: portfolioData });
});

app.get('/skills', (req, res) => {
  res.render('skills', { portfolio: portfolioData });
});

app.get('/contact', (req, res) => {
  res.render('contact', { portfolio: portfolioData });
});

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });

module.exports = app;