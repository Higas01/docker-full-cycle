const express = require("express");
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'db',  
  user: 'root',
  password: 'root',
  database: 'desafio2'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');

  connection.query(`
    CREATE TABLE IF NOT EXISTS people (
      id int not null auto_increment,
      name varchar(255),
      PRIMARY KEY (id)
    )
  `, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return;
    }
    console.log('Tabela "people" criada ou já existente');
  });

  connection.query(`INSERT INTO people(name) VALUES ("Higor")`, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      return;
    }
    console.log('Dados inseridos na tabela "people"');
  });
});

app.get("/", (req, res) => {
  connection.query(`SELECT name FROM people`, (err, results) => {
    if (err) {
      console.error('Erro ao consultar dados:', err);
      res.status(500).send('Erro ao consultar dados');
      return;
    }

    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});