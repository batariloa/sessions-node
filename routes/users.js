var express = require('express');
var router = express.Router();
const passport = require('passport')
const isAuthenticated = require('../middleware/authMiddleware')
const User = require('../model/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//  pocetak
router.post('/login',  passport.authenticate('local'), (req,res)=>{
  res.send('User logged in.')
})

router.post('/register', (req,res)=>{


  const {email, password, name} = req.body
  if(!email || !password || !name){
    res.status(400).json({msg:'Please fill all the required fields'})
  }

  
  User.create({email, password, name})
  res.status(201).json({msg:'User created'})
})



router.post('/logout', (req,res)=>{


  const {email, password, name} = req.body
  if(!email || !password || !name){
    res.status(400).json({msg:'Please fill all the required fields'})
  }
  User.create({email, password, name})
  res.status(201).json({msg:'User created'})
})

router.get('/protected-route', isAuthenticated, (req,res)=>{

  res.status(200).send("User is allowed to visit page.")
})

module.exports = router;
