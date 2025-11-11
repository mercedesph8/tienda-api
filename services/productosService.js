const fs = require('fs');
const path = require('path');

// ✅ Rutas correctas a los JSON
const rutaProductos = path.join(__dirname, '../data/productos.json');
const rutaCategorias = path.join(__dirname, '../data/categorias.json');

// ✅ Función para leer productos
function leer() {
  const data = fs.readFileSync(rutaProductos, 'utf-8');
  return JSON.parse(data);
}

// ✅ Función genérica por si necesitas leer otro JSON
function leerJSON(ruta) {
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

// ✅ Productos con categoría incluida
exports.listarConCategorias = () => {
  const productos = leerJSON(rutaProductos);
  const categorias = leerJSON(rutaCategorias);

  return productos.map(p => {
    const categoria = categorias.find(c => c.id === p.categoriaId);
    return {
      ...p,
      categoria: categoria ? categoria.nombre : 'Sin categoría'
    };
  });
};

// ✅ Guardar datos actualizados
function guardar(datos) {
  fs.writeFileSync(rutaProductos, JSON.stringify(datos, null, 2));
}

// ✅ CRUD
exports.listar = () => leer();

exports.buscarPorId = (id) => leer().find(p => p.id === id);

exports.crear = (nuevo) => {
  const datos = leer();
  nuevo.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
  datos.push(nuevo);
  guardar(datos);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const datos = leer();
  const index = datos.findIndex(p => p.id === id);
  if (index === -1) return null;
  datos[index] = { ...datos[index], ...cambios };
  guardar(datos);
  return datos[index];
};

exports.eliminar = (id) => {
  const datos = leer();
  const index = datos.findIndex(p => p.id === id);
  if (index === -1) return null;
  const eliminado = datos.splice(index, 1);
  guardar(datos);
  return eliminado[0];
};
