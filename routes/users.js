var express = require('express');
var router = express.Router();

const knex = require('knex')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .then(function(users){
      res.render('users', {
        users
      })
    })
});

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

module.exports = router;
