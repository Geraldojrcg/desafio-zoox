# Desafio Zoox

Este repositório contém o código fonte dos projetos front-end (desafio-front) e back-end (desafio-back) que resolvem o desafio proposto pela Zoox.

## Tecnologias usadas
- Node.js
- Nest.js
- MongoDB
- Vue.js

## Pré-requisitos para rodar os projetos
-  Ter instalado no computador o node.js e npm

## Projeto Back-end
- ### Rodando o projeto
    Instale o nest-cli com o comando:
    `npm i -g @nestjs/cli`
    Na pasta raiz do projeto execute o comando:
    `cd desafio-back && npm install && npm run start`
- ### Documentação das rotas
    A documentação das rotas da api foi feita usando o Swagger.
    Para acessa-la basta abrir o seguinte link após rodar o projeto:
    http://localhost:3000/api
- ### Banco de dados
    O banco de dados usado no projeto está hospedado em um cluster grátis do mongodb Atlas
- ### Autenticação
    A todas as rotas api foram protegidas pela estratégia X-Api-Key. 
    Dessa forma, para ter acesso basta passar uma chave de api válida no         campo x-api-key inserido no header da requisição.
    ###### Chaves válidas:
    - ca03na188ame03u1d78620de67282882a84
    - d2e621a6646a4211768cd68e26f21228a81

## Projeto Front-end
- ### Rodando o projeto
    Na pasta raiz do projeto execute o comando:
    `cd desafio-front && npm install && npm run serve`

## Deploy no Heroku
Como um ponto a mais, tomei a liberdade de fazer o deploys de ambos os projetos em meu Heroku pessoal. O acesso os projetos está disponível nos links abaixo:

- Front-end: https://desafio-zoox-front.herokuapp.com
- Back-end: https://desafio-zoox-back.herokuapp.com
