const { body, validationResult } = require('express-validator');

exports.validarPedido = [
  body('clienteId')
    .notEmpty().withMessage('El campo "clienteId" es obligatorio.')
    .isInt({ gt: 0 }).withMessage('clienteId debe ser un número entero positivo.'),
  body('productos')
    .notEmpty().withMessage('El campo "productos" es obligatorio.')
    .isArray({ min: 1 }).withMessage('productos debe ser un array con al menos un producto.'),
  body('total')
    .notEmpty().withMessage('El campo "total" es obligatorio.')
    .isFloat({ gt: 0 }).withMessage('total debe ser un número positivo.'),

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
