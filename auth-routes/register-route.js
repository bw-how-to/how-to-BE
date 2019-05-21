const router = require('express').Router();
const db =require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')
const secrets=require('../config/secret.js')

 router.post('/', (req, res) => {
    let user=req.body 

    const hash=bcrypt.hashSync(user.password,10)

    user.password=hash

    if(!user.username || !user.password || !user.type ){
        res.status(422).json({message:'You must have a Username, Password, and type of account to register'})
    }else{
    db('users')
    .insert(req.body,'id')
    .then(user =>{
        db('users')
        .where({username:req.body.username})
        .first()
        .then(user =>{ 
            const token=generateToken(user)
            res.status(200).json({username:user.username,id:user.id,token})
          })
    .catch(err=>{
        res.send(err.message).json({message:'unable to sign up'})
    })
})
}
    
      });

      function generateToken(user){
        const payload={
            subject: user.id,
            username:user.username,
            type:user.type
        };
        const options={
            expiresIn:'1h'
        };
            return jwt.sign(payload, secrets.jwtSecret, options)
        }


 module.exports=router