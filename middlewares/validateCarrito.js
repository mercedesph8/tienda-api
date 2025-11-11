const { body, validationResult } = require('express-validator');

exports.validarCarrito = [
  body('clienteId')
    .notEmpty().withMessage('El campo "clienteId" es obligatorio.')
    .isInt({ gt: 0 }).withMessage('clienteId debe ser un número entero positivo.'),
  body('productos')
    .isArray().withMessage('El campo "productos" debe ser un arreglo.')
    .custom((productos) => {
      for (const p of productos) {
        if (!p.productoId || p.cantidad == null) {
          throw new Error('Cada producto debe tener "productoId" y "cantidad".');
        }
        if (typeof p.cantidad !== 'number' || p.cantidad <= 0) {
          throw new Error('"cantidad" debe ser un número positivo.');
        }
      }
      return true;
    }),
  body('activo')
    .optional()
    .isBoolean().withMessage('"activo" debe ser true o false.'),

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
