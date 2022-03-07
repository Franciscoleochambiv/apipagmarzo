const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");
//const multer=require("../../config/multer");

//const 

const mysql = require('mysql');
const path =require('path')
const multer = require('multer')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'../../../../../../../var/www/html/upload'))
    },
    filename: function (req, file, cb) {
       var str = file.mimetype; 
       var resul = str.split("/");
       
       
       //str.substring(str.length - 3, str.length);
      cb(null, file.fieldname + '-' + Date.now()+"."+resul[1])
    }
  })
   
  const  uploader = multer({ storage: storage })  

//const uploader=multer({storage});






 router.post("/",uploader.single('file'), async (req, res,next) => {
  //const { id,  amount } = req.body;
 // console.log(req.body);
  const {file}=req;
  console.log(file)
 // console.log(body)
  var archivo=file.filename;
  console.log("archivo");
  console.log(archivo) 
  console.log(file.mimetype)


  //var str = file.mimetype; 
  //var resul = str.substring(str.length - 3, str.length);
  //console.log(resul);

  //archivo=archivo+"."+resul;
  console.log(archivo)

  if (archivo.length>0){

    res.send(archivo)

  }
  else{
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)


  }


 
});


router.get("/view/:id", (req, res) => {
  // passport.authenticate("jwt", { session: false }),
  var id=req.params.id;
   console.log(id);
   //res.send('Hello World:' +id )
  
   res.json(id)    
   
 });


module.exports = router;
