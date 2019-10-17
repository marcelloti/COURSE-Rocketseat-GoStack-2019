const express = require('express');

const server = express();


// Route params = /users/1
// Request body = { "name": "Diego", "email": "diego@rocketseat.com.br" }

/**
 * Query params example
 */
// server.get('/users', (req, res) => {
// http://localhost:3000/users?name=Teste
// Query params
// const name = req.query.name;
// return res.json({message: `Hello ${name}`});
// });

/**
 * Route params
 */
/*server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return res.json({message: `Searching user ${id}`});
});*/

const users = ['Diego', 'Cláudio', 'Victor'];

server.get('/users/:index', (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.listen(3000);