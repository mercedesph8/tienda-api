const express = require('express');
const router = express.Router();
const carritosController = require('../controllers/carritosController');
const { validarCarrito } = require('../middlewares/validateCarrito'); // ✅ importamos middleware

router.get('/', carritosController.obtenerTodos);
router.get('/:id', carritosController.obtenerPorId);

// ✅ Aplica validación SOLO en POST
router.post('/', validarCarrito, carritosController.crear);

router.put('/:id', carritosController.actualizar);
router.delete('/:id', carritosController.eliminar);

module.exports = router;
