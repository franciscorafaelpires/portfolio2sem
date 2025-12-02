const portfolioData = {
  info: {
    name: 'Francisco Rafael Pires',
    title: 'Desenvolvedor Web Full Stack',
    course: 'Cursando Desenvolvimento de Software Multiplataforma – FATEC-SJC (2024-2027)',
    objective: 'Sou um estudante de tecnologia aprendendo sobre desenvolvimento de software e quero trabalhar em projetos que envolvam a criação de sites em várias plataformas e dispositivos. Meu objetivo é trabalhar com desenvolvimento web back-end.',
    education: 'Cursando Desenvolvimento de Software Multiplataforma – FATEC-SJC (2024-2027)',
    linkedin: 'https://www.linkedin.com/in/francisco-rafael-pires-755958163/',
    github: 'https://github.com/franciscorafaelpires',
    email: 'franciscorafaelpires@gmail.com'
  },
  curriculum: {
    education: 'Cursando Desenvolvimento de Software Multiplataforma – FATEC-SJC (2024-2027)',
    certifications: [
      'Certificação em Desenvolvimento Web Full Stack pela Trybe',
      'Desenvolvimento Web - Udemy'
    ]
  },
  projects: [
    {
      nome: 'Site para ajudar os eleitores a acompanhar e escolher vereadores (API)',
      descricao: 'Desenvolvi em equipe um site que facilita o acesso para o eleitor acompanhar o trabalho dos vereadores de São José dos Campos, inspirado no site da camaraSemPapel.',
      tecnologias: 'Flask, MySQL, HTML, CSS, JavaScript',
      skills_list: 'Flask, MySQL, HTML, CSS, JavaScript',
      desafio: 'Desenvolver a página sobre nós, que mostra um pouco sobre os membros do grupo de API, implementei as rotas no Flask, implementei a lógica do campo de busca na página menu.',
      solucao: 'Utilizei o micro framework Flask junto com HTML e CSS para facilitar a implementação de uma interface Web intuitiva.',
      repositorio: 'https://github.com/Byte-Team-Fatec/Byte_Team-API-1-',
      imagem: '/images/projeto-1sem.png'
    },
    {
      nome: 'Dashboard Web com Dados de Impacto (API)',
      descricao: 'Projeto desenvolvido para a plataforma Helpnei.',
      tecnologias: 'Node.js, Express, Mysql, HTML/CSS, JavaScript, React, Typescript',
      skills_list: 'Node.js, Express, Mysql, HTML/CSS, JavaScript, React, Typescript',
      desafio: 'Foco em exibição de indicadores estratégicos para patrocinadores, administradores e stakeholders.',
      solucao: 'Integração de biblioteca JavaScript com API REST para uma interface intuitiva.',
      repositorio: 'https://github.com/ORBIS-2DSM-API/orbis-main',
      imagem: '/images/helpnei.png'
    }
    ,
    {
      nome: 'Sistema de gerenciamento de tarefas (API)',
      descricao: 'Projeto desenvolvido para a plataforma GSW para o gerenciamento de tarefas.',
      tecnologias: 'React, Typescript, HTML, TailwindCSS, VITE, Java, Spring-boot, Maven, MongoDb, GIT, Jira',
      skills_list: 'React, Typescript, HTML, TailwindCSS, Vite, Java, Spring-boot, Maven, MongoDB',
      desafio: 'O desafio é oferecer uma solução que simplifique o processo de gerenciamento de tarefas, permitindo que todos os integrantes da equipe tenham visibilidade sobre o andamento das tarefas, possam colaborar em tempo real e anexar documentos de suporte diretamente às atividades.',
      solucao: 'Desenvolver uma aplicação web responsiva, utilizando React, TypeScript e Vite no frontend, garantindo alta performance, modularidade e excelente experiência de uso em dispositivos desktop e mobile. O backend foi implementado em Java com Spring Boot, estruturado em arquitetura de microserviços, permitindo escalabilidade, fácil manutenção e comunicação eficiente entre os serviços.',
      contribuicoes: 'Durante o projeto, atuei no papel de Desenvolvedor no time Scrum, sendo responsável principalmente pela evolução da arquitetura backend. Realizei a refatoração completa do backend monolítico para uma arquitetura de microserviços, garantindo melhor desacoplamento, escalabilidade e manutenção do sistema. Desenvolvi e implementei serviços independentes utilizando Spring Boot, organizei a comunicação entre eles via APIs REST, e integrei autenticação distribuída por meio de JWT, permitindo um fluxo seguro e stateless entre os serviços.',
      repositorio: 'https://github.com/Syntax-Fatec-SJC/SideQuest',
      imagem: '/images/gerenciamento-de-tarefas-3semestre.png'
    }
  ],
  skills: [
    { name: 'HTML5', type: 'technical' },
    { name: 'CSS3', type: 'technical' },
    { name: 'JavaScript', type: 'technical' },
    { name: 'TypeScript', type: 'technical' },
    { name: 'C#', type: 'technical' },
    { name: 'Python', type: 'technical' },
    { name: 'SQL', type: 'technical' },
    { name: 'Java', type: 'technical' },
    { name: 'React', type: 'technical' },
    { name: 'Node.js', type: 'technical' },
    { name: 'Express', type: 'technical' },
    { name: '.NET Core', type: 'technical' },
    { name: 'Flask', type: 'technical' },
    { name: 'GitHub', type: 'technical' },
    { name: 'MySQL', type: 'technical' },
    { name: 'AWS', type: 'technical' },
    { name: 'TailwindCSS', type: 'technical' },
    { name: 'Vite', type: 'technical' },
    { name: 'Spring-boot', type: 'technical' },
    { name: 'Jira', type: 'technical' },
    { name: 'Comunicação assertiva e clara', type: 'soft' },
    { name: 'Colaboração efetiva em equipes multidisciplinares', type: 'soft' },
    { name: 'Adaptabilidade e aprendizado contínuo', type: 'soft' },
    { name: 'Pensamento analítico e resolução criativa de problemas', type: 'soft' },
    { name: 'Comprometimento com resultados de alta qualidade', type: 'soft' }
  ],
  academicWorks: [
    {
      title: 'xxxxxxx',
      summary: 'xxxxxxx',
      results: 'xxxxxxx'
    }
  ]
};

module.exports = portfolioData;