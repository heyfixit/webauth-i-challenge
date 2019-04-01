const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// const authRouter = require('./auth/controller');
// const usersRouter = require('./users/controller');
const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());
// server.use('/api', authRouter);
// server.use('/api/users', usersRouter);
server.use('/', (req, res) => res.send('API up and running'));
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n*** API running on http://localhost:${port} ***\n`)
);
