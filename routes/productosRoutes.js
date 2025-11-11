// Esta clase asigna la ruta al controlador → Principio de Responsabilidad Única (SOLID)
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const { validarProducto } = require('../middlewares/validateProducto'); // ✅ importamos el middleware

// Rutas
router.get('/', productosController.obtenerTodos);
router.get('/:id', productosController.obtenerPorId);

// ✅ Aplica validación SOLO en el POST
router.post('/', validarProducto, productosController.crear);

router.put('/:id', productosController.actualizar);
router.delete('/:id', productosController.eliminar);

module.exports = router;

// Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la
// misma estructura, cambiando solo los nombres de los controladores.
