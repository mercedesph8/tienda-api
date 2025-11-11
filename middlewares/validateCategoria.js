const { body, validationResult } = require('express-validator');

exports.validarCategoria = [
  body('nombre')
    .notEmpty().withMessage('El campo "nombre" es obligatorio.')
    .isString().withMessage('El campo "nombre" debe ser una cadena de texto.'),
  
  // Middleware final para manejar errores
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        estado: "error",
        errores: errores.array()
      });
    }
    next();
  }
];
