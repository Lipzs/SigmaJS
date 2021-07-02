# SigmaJS

## Sobre 📰

Este é um projeto desenvolvido pelos alunos [Joaquim Lagos](https://github.com/Joaquimlagos), [Filipe Dias](https://github.com/Lipzs),
[Felipe Brückmann](https://github.com/bruckmann) e [Jardel Urban](https://github.com/j-rdel) para o Projeto Integrador do 3° semestre de Análise e desenvolvimento de sistemas da faculdade SENAI florianópolis. 

O objetivo desta aplicação é desenvolver um conjunto de funcionalidades para um jogo educacional para ensino da matemática no ensino fundamental I baseado em perguntas e respostas.

------

## Requisitos do Projeto

* Jogo desenvolvido como uma aplicação Web
* Implementação do backend com JavaScript, Node.js, Express
* Implementação do frontend com HTML, CSS, JavaScript e React
* Backend implementado como Web Service RESTful
* Frontend integrado com o backend e comunicando utilizando JSON
* Integração com banco de dados relacional (Postgres ou MySQL)
* Autenticação e autorização com JWT
* Restrição de acesso a todas as páginas da aplicação apenas para usuários
autenticados, exceto ao formulário de autenticação
* Cada partida deve consistir de uma sequência de 10 perguntas de múltipla
* escolha e registrar a pontuação do usuário
* Apenas uma pergunta deve ser exibida de cada vez para o usuário
* Para avançar para a próxima pergunta, o usuário deve responder a pergunta
atual
* Após a 10ª pergunta, a aplicação deve exibir a pontuação do usuário
* A página inicial deve exibir um ranking dos jogadores por pontuação
* Definir uma estrutura em memória para dar suporte para o armazenamento
das perguntas, com espaço para armazenamento das respostas e pontuação
obtida na pergunta.
* Definir uma estrutura em memória para armazenar o ranking dos jogadores,
permitindo ordenação por nome ou por pontuação - a ordenação deve ser
uma função criada pela equipe, não pode usar API.

------

## Tecnologias utilizadas 💻

- NodeJS
- Express
- Postgresql
- Knex
- JWT
- Winston
- Dotenv
- Cors
- React

```bash
# Ferramentas de desenvolvimento: 
```
- Nodemon
- Postman
- Insomnia
- PgAdmin
------
## Como baixar e executar o projeto 💡

### BACK-END
```bash

# Primeiramente clone o repositorio
$ git clone https://github.com/Lipzs/SigmaJS.git

# Mova se para a pasta do back-end
$ cd SigmaJS/server

# Agora, instale as dependencias com o comando
$ yarn install 
# ou
$ npm install

# Agora para que a aplicação funcione você deve configurar o Banco de Dados

# Após configurar o Banco de Dados basta mover-se para /SigmaJS/server e então executar:

$ yarn start 
# ou
$ npm start

```
------
### Banco de dados

```bash
# Para rodar a aplicação é recomendado que você tenha o postgres instalado no computador/vm ou utilizar o AWS RDS 

# 

```
