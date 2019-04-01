const bcrypt = require('bcrypt');
const Users = require('../users/model');

module.exports = (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    Users.getByUsername(username)
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Unauthorized' });
        }
      })
      .catch(error => res.status(500).json(error));
  } else {
    res.status(401).json({ message: 'Unauthorized user' });
  }
};
