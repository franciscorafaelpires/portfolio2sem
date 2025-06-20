USE portfolioDb;

-- Limpar dados de teste anteriores
DELETE FROM project_skills;
DELETE FROM skills WHERE type = 'technical';
DELETE FROM projects;

-- Inserir um projeto de teste
INSERT INTO projects (nome, descricao, tecnologias, desafio, solucao, repositorio, imagem) 
VALUES (
    'Projeto Teste',
    'Projeto para testar o trigger',
    'Python, JavaScript, React, Node.js, Express',
    'Teste do trigger',
    'Teste do trigger',
    'https://github.com/test',
    '/images/test.png'
);

-- Verificar skills técnicas
SELECT * FROM skills WHERE type = 'technical';

-- Verificar associações
SELECT p.nome, s.name as skill
FROM projects p
JOIN project_skills ps ON p.id = ps.project_id
JOIN skills s ON ps.skill_id = s.id
WHERE s.type = 'technical';