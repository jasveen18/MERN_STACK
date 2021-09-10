const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phone:{
        type:Number,
        required:true,
        unique:true,
        min:10
    },

    work:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    confirm_password:{
        type:String,
        required:true
    },

    date: {
        type: Date,
        default:Date.now
    },
    messages:[
        {
            name: {
                type: String,
                required:true
            },
            email: {
                type: String,
                required:true
            },
            phone: {
                type: Number,
                required:true
            },
            message: {
                type: String,
                required:true
            }
        }
    ], 

    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

// hashing the password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.confirm_password = await bcrypt.hash(this.confirm_password,12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

// adding messages to schema
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}

// create a collection
const User = mongoose.model('USER', userSchema);

module.exports = User;