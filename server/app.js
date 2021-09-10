const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

dotenv.config({path: './.env'});

require('./db/connection');
//const User = require('./model/schema');

app.use(express.json());

const port = process.env.PORT;


app.use(require('./router/auth'));


app.listen(port, ()=>{
    console.log(`server running at port no. ${port}`);
});