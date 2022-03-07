const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");
const  Stripe= require("stripe"); 


const nodemailer = require('nodemailer');


const validateTipoInput = require("../../validation/shoping1.js");
//const validateLoginInput = require("../../validation/login.js");

const Tdocumento = require("../../models/Shoping1");
const mysql = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 100,
    host: 'adry.sytes.net',
    user: 'pancho1',
    password: '12345678',
    port: 3306,    
    database: 'sfsystem'
});




function mathRound2 (num, decimales = 2) {
  //Respuesta de Rubén modificada por mí para el caso general y números negativos
  var exponente = Math.pow(10, decimales);
  return (num >= 0 || -1) * Math.round(Math.abs(num) * exponente) / exponente;
}






async function grabacion(cadena){

       pool.getConnection((err, conn) => {
         conn.query (cadena, (err, customers) => {  
          if (err) {
            console.log(err);
             // res.json(err);
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




    router.post(
      "/add",
    
      //passport.authenticate("jwt", { session: false }),
     async  (req, res) => {
           console.log(req.body);
           const { errors, isValid } = validateTipoInput(req.body);
    
       if (!isValid) {
          
         console.log(errors)
           return res.status(400).json(errors);
          //.then(res=> res.json());
          //.then(data => console.log(data));
        }


        console.log(req.body);
        try {
      
            var iddata= "'"+req.body.id+"'";
            var descripcion= "'"+req.body.name+"'";
            var contenido= "'"+req.body.description+"'";
            var imagen= "'"+req.body.imagen+"'";
            var categoriaid= "'"+req.body.categoriaid+"'";
            var categoriadescri= "'"+req.body.category+"'";
            var tipodato= "'"+req.body.popular+"'";           
            var caden="Insert into publicaciones(id,descripcion,contenido,imagen,categoriaid,categoriadescri,tipodato,date) value ("+iddata+","+descripcion+","+contenido+","+imagen+","+categoriaid+","+categoriadescri+","+tipodato+",now())";
            //"call insertaCategoria("+descripcion+");"
            //"Insert into Categorias(Categoria,descripcion) value ("+codigo+","+descripcion+")";

            console.log(caden);





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
    

router.get("/viewsql", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);


   // passport.authenticate("jwt", { session: false }),
   console.log(req.body);
   pool.getConnection((err, conn) => {
     conn.query('SELECT id,descripcion as name,contenido as description,imagen,video,pdf,categoriaid,categoriadescri,tipodato,date FROM publicaciones order by id DESC', (err, customers) => {
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



router.delete(
  "/view/:id",

 // passport.authenticate("jwt", { session: false }),
 
  async (req, res) => {
    var id=req.params.id;
    console.log(id); 
    var caden="DELETE FROM publicaciones WHERE id ="+id;
    console.log(caden);
    var caedna5= await grabacion(caden);
   return (
    res.json(id)      
    );






  }
)





router.put(
  "/viewsql/:id",
  //passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    console.log("datos obtenidos a la api ")
     
   

      console.log("datos obtenidos a la api ")
      console.log(req.body.id)
     
      id=req.body.id;      
      descripcion="'"+req.body.name+"'";
      contenido="'"+req.body.description+"'";
      imagen="'"+req.body.imageUrls+"'";
      tipodato="'"+req.body.popular+"'";
      categoria="'"+req.body.category+"'";
  
      var caden="UPDATE  publicaciones SET descripcion="+descripcion+",contenido="+contenido+"," +"imagen="+imagen+","+"categoriaid="+categoria+",tipodato="+tipodato+"  WHERE id ="+id;
      console.log(caden);

      
      var caedna5= await grabacion(caden);
      return (
       res.json(req.body)      
       );

    
  }
)




router.get(
  "/viewsql/:id",
  //passport.authenticate("jwt", { session: false }), 

  (req, res) => {

    var id = req.params.id;


    console.log(id);


    // passport.authenticate("jwt", { session: false }),
    console.log(req.body);
    var cadena ='SELECT id,descripcion as name,contenido as description,imagen,video,pdf,categoriaid,categoriadescri,tipodato FROM publicaciones  where  id = '+ id+' order by id DESC';
    console.log(cadena);
    pool.getConnection((err, conn) => {
      conn.query(cadena, (err, customers) => {
          if (err) {
              res.json(err);
          }
  
          res.json(customers[0]);
          conn.release();
          //res.render('customers', {
           //   data: customers
          //});
      });
    });  

  }
)



router.get(
  "/viewcat/:id",
  //passport.authenticate("jwt", { session: false }), 

  (req, res) => {

    var id = req.params.id;


    console.log(id);


    // passport.authenticate("jwt", { session: false }),
    console.log(req.body);
    var cadena ='SELECT id,descripcion as name,contenido as description,imagen,video,pdf,categoriaid,categoriadescri,tipodato FROM publicaciones  where  categoriadescri = "'+ id+'"  order by id DESC';
    console.log(cadena);
    pool.getConnection((err, conn) => {
      conn.query(cadena, (err, customers) => {
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

  }
)





router.post("/correo", (req, res) => {

  //passport.authenticate("jwt", { session: false }),

  var ema='"'+req.body.email+'"';
  var xml='"'+req.body.xml+'"';
  var cdr='"'+req.body.cdr+'"';
  var pdf='"'+req.body.pdf+'"';
  var title=req.body.archivot;

  var tipo=req.body.tipo;



  //console.log(xml)
  console.log("valor del cdr7777")

  console.log(tipo)
  if (tipo=="05"){
    cdr='iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC';
  }
  if (tipo=="03"){
    cdr='iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC';
  }


  var razonemisor=req.body.razonemisor;
  var clienteruc=req.body.clienteruc;
  var clientename=req.body.clientename;
  //1@gmail.com

  if  (ema.length>5){

try{

  console.log(req.body);
  // Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
  if (err) {
      console.error('Failed to create a testing account');
      console.error(err);
      return process.exit(1);
  }

  console.log('Credentials obtained, sending message...');

  // NB! Store the account object values somewhere if you want
  // to re-use the same account for future mail deliveries

  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport(
      {
          host: "smtp.gmail.com",
          port: 25,
          //secure: account.smtp.secure,
          auth: {
              user: "grupo90pr@gmail.com",
              pass: "xxxxxx"
          },
          logger: true,
          debug: false // include SMTP traffic in the logs
      },
      {
          // default message fields

          // sender info
          from: 'grupo90pr@gmail.com',
          headers: {
              'X-Laziness-level': 1000 // just an example header, no need to use this
          }
      }
  );

  // Message object
  let message;

  if (tipo=="01"){

     message = {
      // Comma separated list of recipients
      //to: 'grupo23pe@yahoo.com',
      to: ema,

      // Subject of the message
      subject: " Envio Automatico de Comprobantes de: "+razonemisor+  Date.now(),

      // plaintext body
      text: 'Hello to myself!',

      // HTML body
      html: `<p><b>Hola</b> `+clientename +`<img src="http://adryan2.sytes.net/shopingweb/ima/pancho.jpg"/></p>
      <p>Tiene Algunos Comprobantes Adjuntos:<br/><img src="cid:nyan@example.com"/></p>`,

      // AMP4EMAIL
      amp: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
            <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        </body>
      </html>`,

      // An array of attachments      
      attachments: [
          // String attachment

          /*
          {
              filename: 'notes.txt',
              content: 'Some notes about this e-mail',
              contentType: 'text/plain' // optional, would be detected from the filename
          },

          // Binary Buffer attachment
          {
              filename: 'image.png',
              content: Buffer.from(
                  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                      '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                      'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                  'base64'
              ),

              //cid: 'note@example.com' // should be as unique as possible
              cid: ema // should be as unique as possible
          },


          */

          // Binary Buffer attachment
          {
            filename: title+'.pdf',
            content: Buffer.from(pdf, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },

          // Binary Buffer attachment
          {
            filename: title+'.zip',
            content: Buffer.from(xml, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },
          {
            filename: 'R-'+title+'.zip',
            content: Buffer.from(cdr, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },




          // File Stream attachment
          {
              filename: 'nyan cat ✔.gif',
              path: __dirname + '/assets/nyan.gif',
              cid: ema // should be as unique as possible
          }
      ],

      list: {
          // List-Help: <mailto:admin@example.com?subject=help>
          help: 'admin@example.com?subject=help',

          // List-Unsubscribe: <http://example.com> (Comment)
          unsubscribe: [
              {
                  url: 'http://example.com/unsubscribe',
                  comment: 'A short note about this url'
              },
              'unsubscribe@example.com'
          ],

          // List-ID: "comment" <example.com>
          id: {
              url: 'mylist.example.com',
              comment: 'This is my awesome list'
          }
      }
  };



   }

  else {  

   message = {
      // Comma separated list of recipients
      //to: 'grupo23pe@yahoo.com',
      to: ema,

      // Subject of the message
      subject: " Envio Automatico de Comprobantes de: "+razonemisor+  Date.now(),

      // plaintext body
      text: 'Hello to myself!',

      // HTML body
      html: `<p><b>Hola</b> `+clientename +`<img src="http://adryan2.sytes.net/shopingweb/ima/pancho.jpg"/></p>
      <p>Tiene Algunos Comprobantes Adjuntos:<br/><img src="cid:nyan@example.com"/></p>`,

      // AMP4EMAIL
      amp: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
            <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        </body>
      </html>`,

      // An array of attachments      
      attachments: [
          // String attachment

          /*
          {
              filename: 'notes.txt',
              content: 'Some notes about this e-mail',
              contentType: 'text/plain' // optional, would be detected from the filename
          },

          // Binary Buffer attachment
          {
              filename: 'image.png',
              content: Buffer.from(
                  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                      '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                      'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                  'base64'
              ),

              //cid: 'note@example.com' // should be as unique as possible
              cid: ema // should be as unique as possible
          },


          */

          // Binary Buffer attachment
          {
            filename: title+'.pdf',
            content: Buffer.from(pdf, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },

          // Binary Buffer attachment
          {
            filename: title+'.zip',
            content: Buffer.from(xml, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },
         



          // File Stream attachment
          {
              filename: 'nyan cat ✔.gif',
              path: __dirname + '/assets/nyan.gif',
              cid: ema // should be as unique as possible
          }
      ],

      list: {
          // List-Help: <mailto:admin@example.com?subject=help>
          help: 'admin@example.com?subject=help',

          // List-Unsubscribe: <http://example.com> (Comment)
          unsubscribe: [
              {
                  url: 'http://example.com/unsubscribe',
                  comment: 'A short note about this url'
              },
              'unsubscribe@example.com'
          ],

          // List-ID: "comment" <example.com>
          id: {
              url: 'mylist.example.com',
              comment: 'This is my awesome list'
          }
      }
  };
}









  transporter.sendMail(message, (error, info) => {
      if (error) {
          console.log('Error occurred');
          console.log(error.message);
         //  return process.exit(1);
      }

      console.log('Message sent successfully!');
      console.log(nodemailer.getTestMessageUrl(info));

      // only needed when using pooled connections
      transporter.close();
  });
});


return (
  res.status(200).json({
    confirm: "EXITO"
  })
)

}

catch (error) {
  console.log(error);
  return res.status(400).json({
    message: error.message
  });
}

}
  
});



module.exports = router;
