const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const { validarCliente } = require('../middlewares/validatecliente'); // ✅ importamos correctamente

// Rutas
router.get('/', clientesController.obtenerTodos);
router.get('/:id', clientesController.obtenerPorId);

// ✅ Aplica validación SOLO en el POST
router.post('/', validarCliente, clientesController.crear);

router.put('/:id', clientesController.actualizar);
router.delete('/:id', clientesController.eliminar);

module.exports = router;
