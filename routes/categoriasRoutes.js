const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const { validarCategoria } = require('../middlewares/validateCategoria'); // ✅ importar validador

// Rutas
router.get('/', categoriasController.obtenerTodos);
router.get('/:id', categoriasController.obtenerPorId);
router.post('/', validarCategoria, categoriasController.crear); // ✅ aplicar validación
router.put('/:id', categoriasController.actualizar);
router.delete('/:id', categoriasController.eliminar);

module.exports = router;
