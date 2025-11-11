
const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');
const { validarProveedor } = require('../middlewares/validateProveedor'); // ✅ importamos middleware

router.get('/', proveedoresController.obtenerTodos);
router.get('/:id', proveedoresController.obtenerPorId);

// ✅ Aplica validación SOLO en el POST
router.post('/', validarProveedor, proveedoresController.crear);

router.put('/:id', proveedoresController.actualizar);
router.delete('/:id', proveedoresController.eliminar);

module.exports = router;
