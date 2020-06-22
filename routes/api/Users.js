const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth');
//Item model 
const User = require('../../models/User');

// @route POST api/users
// @desc register new user
// @access Public
router.post('/', (req,res)=>{
    const {name, email, password} = req.body;
    // simple validation
    if(!name || !email || !password){
        return res.status(400).json({msg:"please enter all fileds"});
    };
     // check for existing user
     User.findOne({email})
        .then(user =>{
            if(user) return res.status(400).json({msg:"user already exists"})
            const newUser= new User({
                name,
                email,
                password
            });
            // create salt and hash
            bcrypt.genSalt(10, (error,salt)=>{
                bcrypt.hash(newUser.password, salt, (error,hash)=>{
                    if(error) throw error;
                    newUser.password= hash;
                    newUser.save()
                        .then(user =>{
                            jwt.sign(
                                {id:user.id},
                                config.get('jwtSecret'),
                                {expiresIn: 3600},
                                (error,token)=>{
                                    if(error) throw error;
                                    res.json({
                                        token,
                                        user:{
                                            id: user.id,
                                            name: user.name,
                                            email:user.email
                                        }
                                    });
                                }
                            )
                            
                        });
                })

            });


        });
    
    

});
// @route GET api/auth/user
// @desc get user data
// @access Private
router.get('/user', auth, (req,res)=>{
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})


module.exports = router;


//export defaul router


    
   
       
            