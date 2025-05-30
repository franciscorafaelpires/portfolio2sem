create database portfolioDb;
use portfolioDb;

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

select * from projects;