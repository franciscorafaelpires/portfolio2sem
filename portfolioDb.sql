drop database if exists portfolioDb;
create database portfolioDb;
use portfolioDb;

CREATE TABLE portfolio_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    title VARCHAR(100),
    course TEXT,
    objective TEXT,
    education TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    tecnologias VARCHAR(255),
    desafio TEXT,
    solucao TEXT,
    repositorio VARCHAR(255),
    imagem VARCHAR(255)
);

CREATE TABLE curriculum (
    id INT AUTO_INCREMENT PRIMARY KEY,
    education TEXT,
    certifications TEXT
);

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    type ENUM('technical', 'soft') NOT NULL
);

CREATE TABLE project_skills (
    project_id INT,
    skill_id INT,
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE academic_works (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    summary TEXT,
    results TEXT
);

-- Função para processar tecnologias
DELIMITER //
CREATE FUNCTION process_technologies(tech_list VARCHAR(255)) 
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(255);
    SET result = REPLACE(tech_list, ' ', '');
    RETURN result;
END //
DELIMITER ;

-- Trigger para adicionar tecnologias como skills técnicas
DELIMITER //
CREATE TRIGGER after_project_insert
AFTER INSERT ON projects
FOR EACH ROW
BEGIN
    DECLARE tech VARCHAR(255);
    DECLARE tech_list VARCHAR(255);
    DECLARE tech_id INT;
    DECLARE i INT DEFAULT 1;
    DECLARE count INT;
    
    -- Processa a lista de tecnologias
    SET tech_list = process_technologies(NEW.tecnologias);
    SET count = (LENGTH(tech_list) - LENGTH(REPLACE(tech_list, ',', ''))) + 1;
    
    -- Loop para processar cada tecnologia
    WHILE i <= count DO
        -- Extrai a tecnologia atual
        SET tech = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(tech_list, ',', i), ',', -1));
        
        -- Verifica se a skill já existe
        SELECT id INTO tech_id FROM skills WHERE name = tech AND type = 'technical';
        
        -- Se não existe, insere como nova skill técnica
        IF tech_id IS NULL THEN
            INSERT INTO skills (name, type) VALUES (tech, 'technical');
            SET tech_id = LAST_INSERT_ID();
        END IF;
        
        -- Associa a skill ao projeto
        INSERT IGNORE INTO project_skills (project_id, skill_id) VALUES (NEW.id, tech_id);
        
        SET i = i + 1;
    END WHILE;
END //
DELIMITER ;

-- Inserir dados iniciais
INSERT INTO portfolio_info (name, title, course, objective, education, linkedin, github, email) 
VALUES (
    'Francisco Rafael Pires',
    'Desenvolvedor Web Full Stack',
    'Cursando Desenvolvimento de Software Multiplataforma – FATEC-SJC (2024-2027)',
    'Sou um estudante de tecnologia aprendendo sobre desenvolvimento de software e quero trabalhar em projetos que envolvam a criação de sites em várias plataformas e dispositivos. Meu objetivo é trabalhar com desenvolvimento web back-end.',
    'Cursando Desenvolvimento de Software Multiplataforma – FATEC-SJC (2024-2027)',
    'https://www.linkedin.com/in/francisco-rafael-pires-755958163/',
    'https://github.com/franciscorafaelpires',
    'franciscorafaelpires@gmail.com'
);

INSERT INTO certifications (description) VALUES
('Certificação em Desenvolvimento Web Full Stack pela Trybe'),
('Desenvolvimento Web - Udemy'),
('Python para Data Science - Coursera'),
('Especialização em Data Science - Coursera (Set/2023)'),
('Hackathon XPTO 2023 - 2º lugar em Inovação Tecnológica');

INSERT INTO skills (name, type) VALUES
('Comunicação assertiva e clara', 'soft'),
('Colaboração efetiva em equipes multidisciplinares', 'soft'),
('Adaptabilidade e aprendizado contínuo', 'soft'),
('Pensamento analítico e resolução criativa de problemas', 'soft'),
('Comprometimento com resultados de alta qualidade', 'soft');

-- Inserir projetos de exemplo
INSERT INTO projects (nome, descricao, tecnologias, desafio, solucao, repositorio, imagem) 
VALUES (
    'Site para ajudar os eleitores a acompanhar e escolher vereadores (API)',
    'Desenvolvi em equipe um site que facilita o acesso para o eleitor acompanhar o trabalho dos vereadores de São José dos Campos, inspirado no site da camaraSemPapel.',
    'Flask, MySQL, HTML, CSS, JavaScript',
    'Desenvolver a página sobre nós, que mostra um pouco sobre os membros do grupo de API, implementei as rotas no Flask, implementei a lógica do campo de busca na página menu.',
    'Utilizei o micro framework Flask junto com HTML e CSS para facilitar a implementação de uma interface Web intuitiva..',
    'https://github.com/Byte-Team-Fatec/Byte_Team-API-1-',
    '/images/projeto-1sem.png'
),
(
    'Dashboard Web com Dados de Impacto (API)',
    'Projeto desenvolvido para a plataforma Helpnei.',
    'Node.js, Express, Mysql, HTML/CSS, JavaScript, React, Typescript',
    'Foco em exibição de indicadores estratégicos para patrocinadores, administradores e stakeholders.',
    'Integração de biblioteca JavaScript com API REST para uma interface intuitiva.',
    'https://github.com/ORBIS-2DSM-API/',
    '/images/helpnei.png'
);

-- Verificar os dados inseridos
SELECT * FROM portfolio_info;
SELECT * FROM certifications;
SELECT * FROM projects;
SELECT * FROM curriculum;
SELECT * FROM skills;
SELECT * FROM project_skills;
SELECT * FROM academic_works;