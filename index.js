require('dotenv').config();
const express = require('express');
const apiRouter = require('./api');
const morgan = require('morgan');
const { client } = require('./db');
const server = express();
const PORT = 3000;
client.connect();

server.use(morgan('dev'));
server.use(express.json())
server.use('/api', apiRouter);

// **** ROUTES ****//
// POST /api/users/register
// POST /api/users/login
// DELETE /api/users/:id

// GET /api/posts
// POST /api/posts
// PATCH /api/posts/:id
// DELETE /api/posts/:id

// GET /api/tags
// GET /api/tags/:tagName/posts


server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});