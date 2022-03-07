const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const md5 = require('md5');


const mysql = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 100,
    host: 'adryan3.sytes.net',
    user: 'pancho1',
    password: '12345678',
    port: 3306,    
    database: 'paginaweb'
});



// Load Input Validation
//const validateRegisterInput = require('../../validation/register');
//const validateLoginInput = require('../../validation/login');

// Load User model
//const User = require('../../models/User');

// @route GET api/users/test
// @desc  Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'Users works!'}));

// @route POST api/users/register
// @desc  Register
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find if such email exists
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm', // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          serie: req.body.serie,
          avatar,
          password: req.body.password, 
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        });
      }
    });
});

// @route POST api/users/login
// @desc  Login User / Returning JWT Token
// @access Public
router.post('/login', async (req, res) => {

  let errors = {};
 
  // Check Validation
  //if (!isValid) {
  //  return res.status(400).json(errors);
  //}

  console.log(req.body);

  const nombre = req.body.email;
  const password = md5(req.body.password);

  
  console.log(password)
  console.log(nombre)







  
  //try {
    var  cadena = 'SELECT * FROM usuarios WHERE nombre='+'"'+nombre+'"'+ ' AND password='+'"'+password+'"';
    console.log(cadena);

    pool.getConnection((err, conn) => {
      conn.query(cadena, (err, customers) => {
      //SELECT  a.id,a.codigo, a.descripcion,a.costo,a.precio,a.proveedor,a.linea,a.grupo,a.imagen,a.codigostock,a.fecha_cad,a.precio1,a.precio2,a.stockm,a.UM_ID,a.detalle,deslinea from articulos as a  inner join lineas on lineas.linea=a.linea order by id DESC', (err, customers) => {
          if (err) {

            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
             // res.json(err);
          }
          console.log(customers.length)



          if (customers.length !=0) {

           console.log(customers[0].id)
           console.log(customers[0].nombre)
           console.log(customers[0].Serie)
           const payload = { id: customers[0].id, name: customers[0].nombre, avatar: "", serie: customers[0].Serie };          
          //return res.status(200).json(customers);
          //res.json(customers);
      
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              })
          });



          }
          else{

            errors.password = 'Password incorrect';
      return res.status(400).json(errors);
          }
                    

        
  
          //res.json(customers);
          conn.release();
          //res.render('customers', {
           //   data: customers
          //});
      });
    });  


/*
    const user = await User.findOne({email});
    // Check for user
    if(!user) {
      errors.email = 'User not found';
      return res.status(400).json(errors);
    }
    // Check the password
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
      // User Matched
      // Create JWT Payload
      const payload = { id: user.id, name: user.name, avatar: user.avatar, serie: user.serie };
      
      // Sign Token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          })
      });
    } else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({email: 'Server error, try again later!'});
  }

  */
});

// @route GET api/users/current
// @desc  Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      serie: req.user.serie,
    });
  }
);

module.exports = router;