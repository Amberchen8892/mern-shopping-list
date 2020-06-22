const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken')
//Item model 
const User = require('../../models/User');

// @route POST api/auth
// @desc authenicate user
// @access Public
router.post('/', (req,res)=>{
    const { email, password} = req.body;
    // simple validation
    if( !email || !password){
        return res.status(400).json({msg:"please enter all fileds"});
    };
     // check for existing user
     User.findOne({email})
        .then(user =>{
            if(!user) return res.status(400).json({msg:"user doesn't exist"});

            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(!isMatch) return res.status(400).json({msg:'invalid credentials'});
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
                })



        });
    
    

});



module.exports = router;


//export defaul router


    
   
       
            