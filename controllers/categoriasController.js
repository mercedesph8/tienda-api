//Clase completa, hacer las demás
const categoriasService = require('../services/categoriasService');
exports.obtenerTodos = (req, res) => {
const categorias = categoriasServicesService.listar();
res.json(categorias);
};
exports.obtenerPorId = (req, res) => {
const categorias = proveedoresService.buscarPorId(parseInt(req.params.id));
categorias ? res.json(categorias) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.crear = (req, res) => {
const nuevo = categoriasService.crear(req.body);
res.status(201).json(nuevo);
};
exports.actualizar = (req, res) => {
const actualizado = categoriasService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.eliminar = (req, res) => {
const eliminado = categoriasService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};