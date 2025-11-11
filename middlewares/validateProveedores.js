const { body, validationResult } = require('express-validator');

exports.validarProveedor = [
  body('nombre')
    .notEmpty().withMessage('El campo "nombre" es obligatorio.')
    .isString().withMessage('El nombre debe ser una cadena de texto.'),
  body('precio')
    .notEmpty().withMessage('El campo "precio" es obligatorio.')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo.'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        estado: 'error',
        errores: errores.array()
      });
    }
    next();
  }
];
