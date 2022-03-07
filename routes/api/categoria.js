const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");
//const 

const mysql = require('mysql');


console.log(process.env.PORT);


var pool  = mysql.createPool({
    connectionLimit : 100,

    host: 'adry.sytes.net',
    user: 'pancho85',
    password: '1233',
    port: 3306,    
    database: 'fsystem'

});


async function grabacion(cadena){
  pool.getConnection((err, conn) => {
    conn.query (cadena, (err, customers) => {  
     if (err) {
       console.log(err.code);
        // res.json(err);
        return 1;
     }

     console.log(customers)

     // res.json(customers);
     conn.release();

   //  console.log("se ha grando");
     var mensaje="se hya grabado";

         return customers;

     
    //await  conn.close();
     //res.render('customers', {
      //   data: customers
     //});
 });

});

}

const validateTipoInput = require("../../validation/categoria.js");
//const validateLoginInput = require("../../validation/login.js");

const Tdocumento = require("../../models/Categoria");





//llamadas a  mysql

router.get("/viewsql", (req, res) => {
  // passport.authenticate("jwt", { session: false }),
   console.log(req.body);
   pool.getConnection((err, conn) => {
     conn.query('SELECT Categoria as codigo,descripcion,id FROM Categorias order by id DESC', (err, customers) => {
         if (err) {
             res.json(err);
         }
 
         res.json(customers);
         conn.release();
         //res.render('customers', {
          //   data: customers
         //});
     });
   });  
 });



 router.post("/addcatesql", async (req, res) => {
  //const { id,  amount } = req.body;
  console.log(req.body);
  try {

      var codigo="'"+req.body.codigo+"'";
      var descripcion= "'"+req.body.descripcion+"'";
      
      var caden="Insert into Categorias(Categoria,descripcion) value ("+codigo+","+descripcion+")";
      //"call insertaCategoria("+descripcion+");"
      //"Insert into Categorias(Categoria,descripcion) value ("+codigo+","+descripcion+")";
      var cadena5= await grabacion(caden);
      console.log("cadena 5")

      
      return (
      res.json(req.body)      
      );

    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message
      });
    }
 
});



router.delete(
  "/viewsql/:id",
  //passport.authenticate("jwt", { session: false }),
 async  (req, res) => {
   // console.log(res)
   var id=req.params.id;

  console.log(id);



   var caden="DELETE FROM Categorias WHERE Categoria  ="+id;

   console.log(caden);



   var caedna5= await grabacion(caden);
   return (
    res.json(req.body)      
    );



  }
)


router.put(
  "/viewsql/:id",
 // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
     

    console.log("datos obtenidos a la api ")
    console.log(req.body.id)
    console.log(req.body.codigo)
    console.log(req.body.descripcion)

    console.log (req.body.codigo)
    id=req.body.id;
    codigo=req.body.codigo;
    descripcion="'"+req.body.descripcion+"'";

    var caden="UPDATE  Categorias SET descripcion="+descripcion+" "+ " WHERE Categoria ="+codigo;
    var caedna5= await grabacion(caden);
    return (
     res.json(req.body)      
     );



/*
    Tdocumento.findOne({ _id: req.params.id })
    .then(tiposfile =>
          {


             console.log("actualizando el archivos verifica que este llegando la peticions") 
           const myquery = {_id: req.params.id };
           const newvalues = { $set: {codigo: req.body.codigo,descripcion:req.body.descripcion}};
            Tdocumento.updateMany(myquery,newvalues) 
            .then(tiposfile => res.json(tiposfile));
            console.log("resultado del array")
            console.log(tiposfile) 
           }
      )
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));

    */
    
    
  }
)






module.exports = router;
