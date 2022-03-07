const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateTipoInput(data) {
  let errors = {};

 // data.id = !isEmpty(data.id) ? data.id : "";
  data.name = !isEmpty(data.name) ? data.name : "";

//  if (Validator.isEmpty(data.id)) {
//    errors.id = "Debe Ingresar un id";
 // }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Debe Ingresar Un Nombre";
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

