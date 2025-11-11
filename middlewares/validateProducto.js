const { body, validationResult } = require('express-validator');

exports.validarProducto = [
  body('nombre')
    .notEmpty().withMessage('El campo "nombre" es obligatorio.')
    .isString().withMessage('El nombre debe ser una cadena de texto.'),
  body('precio')
    .notEmpty().withMessage('El campo "precio" es obligatorio.')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo.'),
  body('categoriaId')
    .notEmpty().withMessage('El campo "categoriaId" es obligatorio.')
    .isInt({ gt: 0 }).withMessage('El categoriaId debe ser un número entero.'),
  
  // Middleware final: verifica si hay errores
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
