const express = require('express');
const router = express.Router();
const productosController = require('../controllers/pedidosController');
router.get('/', pedidosController.obtenerTodos);
router.get('/:id', pedidosController.obtenerPorId);
router.post('/', pedidosController.crear);
router.put('/:id', pedidosController.actualizar);
router.delete('/:id', pedidosController.eliminar);
module.exports = router;