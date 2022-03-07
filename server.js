const express = require('express');
const fs = require("fs");
//const https = require("https");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const morgan =  require("morgan");



require('dotenv').config();

const https = require("https");


const mysql = require('mysql');

const myConnection = require('express-myconnection');



const users = require('./routes/api/users');

const shoping1 = require("./routes/api/shoping1");

const categoria =require("./routes/api/categoria");


const upload =require("./routes/api/upload");

const { join } = require('path');
//const Productos = require('./models/Productos');



const app = express();
app.use(morgan('dev'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});




app.use(morgan('dev'));




/////////////////////////////////////////////////////////



// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport.js')(passport);

// Use Routes
app.use('/api/users', users);


app.use("/api/shoping1", shoping1);

app.use("/api/categoria", categoria);

// Serve static assets if in production





///confioracion  para el https 


const httpsOptions = {
//   cert:fs.readFileSync(path.join(__dirname,'ctr','cert.pem')),
//   key:fs.readFileSync(path.join(__dirname,'ctr','privkey.pem'))
}

const port = process.env.PORT || 7008;

/*
https.createServer(httpsOptions,app)
  .listen(port,function(){
   console.log(`Server running on port https ${port}`)      
      })

      


 /*

const port = process.env.PORT || 3001;



*/
//app.listen(port, () => console.log(`Server running on port ${port}`));



app.listen(port, () => console.log(`Server running on port ${port}`));

