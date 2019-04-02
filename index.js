const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConfig = require('./data/dbConfig');
const restricted = require('./auth/restricted');

const authController = require('./auth/controller');
const usersController = require('./users/controller');
const server = express();

const sessionConfig = {
  name: 'not-a-session',
  secret: 'session secret',
  cookie: {
    maxAge: 1000 * 60 * 15,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: dbConfig,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));
server.use('/api/restricted/*', restricted);
server.use('/api', authController);
server.use('/api/restricted/users', usersController);
server.use('/', (_req, res) => res.send('API up and running'));

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n*** API running on http://localhost:${port} ***\n`)
);
