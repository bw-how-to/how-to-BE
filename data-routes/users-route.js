const router = require('express').Router();
const db =require('../data/dbConfig.js');
const protected=require('../protected/protected.js')

 router.get('/', protected,(req, res) => {
    db('users')
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err));
  });

   module.exports=router 