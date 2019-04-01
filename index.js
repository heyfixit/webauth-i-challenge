const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const restricted = require('./auth/restricted');

const authController = require('./auth/controller');
const usersController = require('./users/controller');
const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/api/restricted/*', restricted);
server.use('/api', authController);
server.use('/api/restricted/users', usersController);
server.use('/', (_req, res) => res.send('API up and running'));

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n*** API running on http://localhost:${port} ***\n`)
);
