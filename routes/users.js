var express = require('express');
var router = express.Router();

const knex = require('knex')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('userblog')
    .then(function(users){
      res.render('users', {
        users
      })
    })
});

module.exports = router;
