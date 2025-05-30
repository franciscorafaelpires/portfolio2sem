require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const { default: portfolioData } = require('./portfolioData');
const app = express();
const port = 3000;

// para usar o EJS
app.set('view engine', 'ejs');

// usando os arquivos estáticos
app.use(express.static('public'));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if(err) throw err;
  console.log('Conectado ao Mysql');
});

// Rotas para as paginas do portfolio
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

// CRUD para projetos
// CREATE
app.post('/api/projects', (req, res) => {
  const { nome, descricao, tecnologias, desafio, solucao, repositorio, imagem } = req.body;
  const sql = 'INSERT INTO projects (nome, descricao, tecnologias, desafio, solucao, repositorio, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, descricao, tecnologias, desafio, solucao, repositorio, imagem], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'projeto inserido com sucesso', id: result.insertId, nome, descricao, tecnologias, desafio, solucao, repositorio, imagem });
  });
});

// READ all
app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// READ by ID
app.get('/api/projects/:id', (req, res) => {
  db.query('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ mensagem: 'Projeto não encontrado' });
    res.send(result[0]);
  });
});

// UPDATE
app.put('/api/projects/:id', (req, res) => {
  const { nome, descricao, tecnologias, desafio, solucao, repositorio, imagem } = req.body;
  const sql = 'UPDATE projects SET nome = ?, descricao = ?, tecnologias = ?, desafio = ?, solucao = ?, repositorio = ?, imagem = ? WHERE id = ?';
  db.query(sql, [nome, descricao, tecnologias, desafio, solucao, repositorio, imagem, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Projeto atualizado com sucesso' });
  });
});

// DELETE
app.delete('/api/projects/:id', (req, res) => {
  db.query('DELETE FROM projects WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Projeto excluído com sucesso' });
  });
});


// CRUD para currículo
// CREATE
app.post('/api/curriculum', (req, res) => {
  const { education, certifications } = req.body;
  const sql = 'INSERT INTO curriculum (education, certifications) VALUES (?, ?)';
  db.query(sql, [education, certifications], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Currículo inserido com sucesso', id: result.insertId, education, certifications });
  });
});

// READ all
app.get('/api/curriculum', (req, res) => {
  db.query('SELECT * FROM curriculum', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// UPDATE
app.put('/api/curriculum/:id', (req, res) => {
  const { education, certifications } = req.body;
  const sql = 'UPDATE curriculum SET education = ?, certifications = ? WHERE id = ?';
  db.query(sql, [education, certifications, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Currículo atualizado com sucesso' });
  });
});

// DELETE
app.delete('/api/curriculum/:id', (req, res) => {
  db.query('DELETE FROM curriculum WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Currículo excluído com sucesso' });
  });
});

// CRUD para skills
// CREATE
app.post('/api/skills', (req, res) => {
  const { name, type } = req.body;
  const sql = 'INSERT INTO skills (name, type) VALUES (?, ?)';
  db.query(sql, [name, type], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Skill inserida com sucesso', id: result.insertId, name, type });
  });
});

// READ all
app.get('/api/skills', (req, res) => {
  db.query('SELECT * FROM skills', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// UPDATE
app.put('/api/skills/:id', (req, res) => {
  const { name, type } = req.body;
  const sql = 'UPDATE skills SET name = ?, type = ? WHERE id = ?';
  db.query(sql, [name, type, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Skill atualizada com sucesso' });
  });
});

// DELETE
app.delete('/api/skills/:id', (req, res) => {
  db.query('DELETE FROM skills WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Skill excluída com sucesso' });
  });
});

// ASSOCIAR SKILLS A PROJETOS
app.post('/api/projects/:projectId/skills', (req, res) => {
  const { skillIds } = req.body; // array de ids de skills
  const { projectId } = req.params;
  if (!Array.isArray(skillIds)) return res.status(400).send({ mensagem: 'skillIds deve ser um array' });
  const values = skillIds.map(skillId => [projectId, skillId]);
  const sql = 'INSERT IGNORE INTO project_skills (project_id, skill_id) VALUES ?';
  db.query(sql, [values], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Skills associadas ao projeto com sucesso' });
  });
});

// BUSCAR SKILLS DE UM PROJETO
app.get('/api/projects/:projectId/skills', (req, res) => {
  const { projectId } = req.params;
  const sql = `SELECT s.* FROM skills s INNER JOIN project_skills ps ON s.id = ps.skill_id WHERE ps.project_id = ?`;
  db.query(sql, [projectId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// REMOVER ASSOCIAÇÃO DE SKILL DE UM PROJETO
app.delete('/api/projects/:projectId/skills/:skillId', (req, res) => {
  const { projectId, skillId } = req.params;
  const sql = 'DELETE FROM project_skills WHERE project_id = ? AND skill_id = ?';
  db.query(sql, [projectId, skillId], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensagem: 'Skill removida do projeto com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});