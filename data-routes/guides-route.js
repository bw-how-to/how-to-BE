const router = require('express').Router();
const db =require('../data/dbConfig.js');
const protect=require('../protected/protected.js');
const checkType = require('../config/restricted-middleware.js');

router.post('/', protect, checkType('creator'),(req, res) => {
    if (!req.body.title||!req.body.user_id || !req.body.type || 
    !req.body.description || !req.body.step_1 ){

        res.status(400).json({message:'In order to add a new guide you must include the following information: A title, your User-id, the type of guide, the description, and atleast one step. '})
    }else{

    db('guides')
    .insert(req.body,'id')
    .then(guide =>{
      res.status(200).json(guide)
    })

    .catch(err=>{
      res.status(500).json(err.message)
    })
}
  });

router.get('/', protect,(req, res) => {

    db('guides')

    .join('users','guides.user_id','users.id',)

    .select('guides.id','guides.title',{username:'users.username'},'guides.type', 'guides.description', 'guides.step_1', 'guides.step_2', 'guides.step_3','guides.step_4', 'guides.step_5','guides.link')
    
    .then(guides => {
      res.status(200).json(guides);
      })

      .catch(err => res.send(err.message));
  });


  router.get('/:id', protect, (req, res) => {

    const id =req.params.id

  db('guides')
  .join('users','guides.user_id','users.id',)

  .select('guides.id','guides.title',{username:'users.username'},'guides.type', 'guides.description', 'guides.step_1', 'guides.step_2', 'guides.step_3','guides.step_4', 'guides.step_5','guides.link')
  
  .where('guides.id', id)
  
  .then(guide=>{
    if(guide.length>0){
    res.status(200).json(guide)

    }else{
      res.status(404).json({message:'the specified Guide does not exist'})
    }
  })

  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.put('/:id', protect, checkType('creator'), (req, res) => {

    db('guides')

    .where({id:req.params.id})

    .update(req.body)

    .then(count=>{

      if (count>0) {
        res.status(200).json({message:`${count} Guide was updated`})
      
    }else{
        res.status(404).json({message:'the specified Guided does not exist'})
      }
    })

    .catch(err =>{
      res.status(500).json(err.message)
    })
  });

  router.delete('/:id', protect, checkType('creator'),(req, res) => {

    db('guides')

    .where({id:req.params.id})

    .del()

    .then(count =>{

      if (count>0){
        res.status(200).json({message:`${count} Guide was deleted`})
      
    }else{
        res.status(400).json({message:'the specified Guide does not exist'})
      }
    })

    .catch(err =>{
      res.status(500).json(err.message)
    })
  });


   module.exports=router