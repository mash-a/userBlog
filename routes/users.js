var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile.js')[environment];
const knex = require('knex')(knexConfig);

//add bcrypt to encrypt passwords
const bcrypt = require('bcrypt-as-promised');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .then(function(users){
      res.render('users', {
        users
      })
    })
});

//get one user
router.get('/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then(function(user){
      knex('posts')
        .where('user_id', req.params.id)
        .then(function(posts){
          res.render('user', {
            user,
            posts
          })
        })
    })
});

//add user
router.post('/', (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  bcrypt.hash(password, 12)
  .then(hashed_password => {
    return knex('users').insert({
      username,
      hashed_password
    })
  })
  .then(() => {
    res.redirect('/users')
  })
  .catch(err => {
    next(err)
  })
});

module.exports = router;
