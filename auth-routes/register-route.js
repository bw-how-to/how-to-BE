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
    .insert(req.body)
    .then(user =>{
        const token=generateToken(user)
        res.status(200).json({message:`You have successfully singed up`,token})
        })

    .catch(err=>{
        res.status(500).json({error:err,message:'Unable to sign up at this time'})
    })
}
      });


       function generateToken(user){
        const payload={
            subject: user.id,
            username:user.username
        };
        const options={
            expiresIn:'1h'
        };
            return jwt.sign(payload, secrets.jwtSecret, options)
        }


 module.exports=router