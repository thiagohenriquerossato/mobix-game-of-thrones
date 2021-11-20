# Processo-Seletivo-Mobix---Desafio-de


### Nesse desafio, utilizei prisma para trabalhar com o banco de dados.

### para povoar o banco é necessario rodar os scripts:
###   primeiramente yarn ts-node-dev src/config/createCharDB.ts e depois yarn ts-node-dev src/config/createdb.ts

## Funcionalidades/rotas:

### /characters/:character : lista um ou mais personages principais com base no nome. Não é case sensitive e busca por string parcial.
####    ex: /characters/san => retorna Sansa Stark e Melisandre

### /characters : lista todos os personagens principais. Total 31 registros

### /books : lista todos os livros. Total 10 registros

### /books/:name lista um ou mais livros trazendo apenas o id, o nome e a imagem de capa no formato base64. Não é case sensitive e busca por string parcial.
#### ex: /books/knight => retorna the hedge knight e the mystery knight

### /books/character/:character lista os livros de um personagem. Nao e case sensitive

![alt text](https://github.com/thiagohenriquerossato/mobix-game-of-thrones/blob/master/mobix-game-of-thrones.png)
