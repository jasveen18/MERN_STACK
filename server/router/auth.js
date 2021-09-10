const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
require('../db/connection');
const User = require('../model/schema');

router.get('/', (req,res)=>{
    res.send(`hello world`);
});

// user registration
router.post('/register', async(req,res)=>{
    
    const { name, email, phone, work, password, confirm_password} = req.body;

    if(!name || !email || !phone || !work || !password || !confirm_password){
        return res.status(422).json({error:'please fill the field properly'});
    }
    
    try{ 

        const userExist = await User.findOne({email:email})
        
        if(userExist){
            return res.status(422).json({error:'email already exist'});
        }
        else if(password != confirm_password){
            return res.status(422).json({error:'password is not matching'});
        }
        else
        {
            const user = new User({name,email,phone,work,password,confirm_password});
            //pre function called 
            const userRegister = await user.save();

            if(userRegister){
                res.status(201).json({message:'user registered successfully'});
            }
            else
            {
                res.status(500).json({error:'failed to register'});
            }
        }

        
                    
    }catch(err){
        console.log(err);
    }   

});


// user signin
router.post('/signin', async(req,res)=>{

    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:'please fill the details'});
        }

        const userSignin = await User.findOne({email:email});
        //console.log(userSignin);
        
        if(userSignin){
            const isMatch = await bcrypt.compare(password,userSignin.password);
            
            const token = await userSignin.generateAuthToken();

            res.cookie('jwtoken', token , {
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            }) ;

            if(!isMatch){
                res.status(400).json({error:'invalid credientials'});
            }
            else
            {
                res.json({message:'user signin successfull'});
            }
        }
        else
        {
            res.status(400).json({error:'invalid credientials'});
        }
        
    }catch(err){
        console.log(err);
    }
});

router.get('/about',authenticate, (req,res)=>{
    res.send(req.rootUser);
});

router.get('/getData',authenticate, (req,res)=>{
    res.send(req.rootUser);
});

router.post('/contact',authenticate, async(req,res)=>{
    try{
        const {name,email,phone,message} = req.body;

        if(!name || !email || !phone || !message){
            console.log('error in contact form');
            return res.json({error:'please filled the contact form'});
        }

        const userContact = await User.findOne({_id: req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name,email,phone,message);
            await userContact.save();

            res.status(201).json({message:'user contact success'});
        }

    }catch(err){
        console.log(err);
    }
});

router.get('/logout', (req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');
});

module.exports = router;

