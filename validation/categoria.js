const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateTipoInput(data) {
  let errors = {};

  data.descripcion = !isEmpty(data.descripcion) ? data.descripcion : "";
//  data.codigo = !isEmpty(data.codigo) ? data.codigo : "";

  if (Validator.isEmpty(data.descripcion)) {
    errors.descripcion = "Debe Ingresar una  Descripcion";
  }

 // if (Validator.isEmpty(data.codigo)) {                                
 //   errors.codigo = "Debe Ingresar Un tipo de Documento";
//  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

