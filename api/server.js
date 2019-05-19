const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../data-routes/users-route.js');
const registerRouter = require('../auth-routes/register-route.js');
const loginRouter =require('../auth-routes/login-route.js')
const guideRouter = require('../data-routes/guides-route.js');


const server=express()

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/register',registerRouter);
server.use('/login',loginRouter);
server.use('/users',usersRouter)
server.use('/guides',guideRouter)

 module.exports = server;