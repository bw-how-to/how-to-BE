const router = require('express').Router();
const db =require('../data/dbConfig.js');
const protect=require('../protected/protected.js')

 router.get('/', protect,(req, res) => {
    db('users')
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err));
  });

  router.get('/:id', protect, (req,res)=>{
    db('users')
    .where({id:req.params.id})
    .first()
    .then(user=>{
        if(user){
        db('guides')
        .where({user_id:req.params.id})
        .then(guides=>{
          user.guides=guides;
          res.status(200).json(user)
        })
      }else{
          res.status(404).json({message:'The User with the Specified ID does not exist'})
      }
    })
    .catch(err=>{
        res.status(500).json({error:err,message:'Unable to find the Specified User at this time.'})
    })
})

   module.exports=router 