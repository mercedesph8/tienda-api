const { body, validationResult } = require('express-validator');

exports.validarCliente = [
  body('nombre')
    .notEmpty().withMessage('El campo "nombre" es obligatorio.')
    .isString().withMessage('El nombre debe ser una cadena de texto.'),
  body('email')
    .notEmpty().withMessage('El campo "email" es obligatorio.')
    .isEmail().withMessage('El email debe tener un formato válido.'),
  body('telefono')
    .notEmpty().withMessage('El campo "telefono" es obligatorio.')
    .isString().withMessage('El telefono debe ser una cadena de texto.'),
  body('direccion')
    .notEmpty().withMessage('El campo "direccion" es obligatorio.')
    .isString().withMessage('La dirección debe ser una cadena de texto.'),

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
