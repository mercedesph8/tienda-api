//Clase completa, hacer las demás
const clientesService = require('../services/clientesService');
exports.obtenerTodos = (req, res) => {
const clientes = clientesServiceService.listar();
res.json(clientes);
};
exports.obtenerPorId = (req, res) => {
const clientes = clientesService.buscarPorId(parseInt(req.params.id));
clientes ? res.json(clientes) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.crear = (req, res) => {
const nuevo = clientesService.crear(req.body);
res.status(201).json(nuevo);
};
exports.actualizar = (req, res) => {
const actualizado = clientesService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.eliminar = (req, res) => {
const eliminado = clientesService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};