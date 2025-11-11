const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const { validarPedido } = require('../middlewares/validatePedido');

router.get('/', pedidosController.obtenerTodos);
router.get('/con-productos', pedidosController.obtenerConProductos);
router.get('/:id', pedidosController.obtenerPorId);
router.post('/', validarPedido, pedidosController.crear); // ✅ validación aplicada
router.put('/:id', pedidosController.actualizar);
router.delete('/:id', pedidosController.eliminar);

module.exports = router;
