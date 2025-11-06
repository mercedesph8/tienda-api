const fs = require('fs');
const path = require('path');
const ruta = path.join(__dirname, '../data/pedidos.json');
const rutaProductos = path.join(__dirname, '../data/productos.json');

// Función para leer pedidos
function leer() {
    const data = fs.readFileSync(ruta, 'utf-8');
    return JSON.parse(data);
}

// Función genérica para leer cualquier JSON (✅ CORREGIDA)
function leerJSON(rutaArchivo) {
    return JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8')); // ✅ USA EL PARÁMETRO
}

// Función para guardar pedidos
function guardar(datos) {
    fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

// Listar pedidos con productos enriquecidos
exports.pedidosConProductos = () => {
    const pedidos = leerJSON(ruta);           
    const productos = leerJSON(rutaProductos); 
    
    return pedidos.map(pedido => {
        const productosDelPedido = pedido.productos.map(idProducto => {
            const producto = productos.find(p => p.id === idProducto);
            return producto;
        }).filter(p => p !== null && p !== undefined);
        
        return {
            ...pedido,
            productos: productosDelPedido
        };
    });
};

// Buscar pedido por ID CON PRODUCTOS ENRIQUECIDOS (✅ CORREGIDA)
exports.buscarPorIdConProductos = (id) => {
    const pedidos = leerJSON(ruta);           // ✅ Lee pedidos.json
    const productos = leerJSON(rutaProductos); // ✅ Lee productos.json
    
    // Busca el pedido con ese ID
    const pedido = pedidos.find(p => p.id === id);
    
    // Si no existe el pedido, devuelve null
    if (!pedido) return null;
    
    // Enriquece los productos del pedido
    const productosDelPedido = pedido.productos.map(idProducto => {
        // Busca en el array de PRODUCTOS (no pedidos)
        const producto = productos.find(p => p.id === idProducto);
        return producto;
    }).filter(p => p !== null && p !== undefined);
    
    // Devuelve el pedido con productos enriquecidos
    return {
        ...pedido,
        productos: productosDelPedido
    };
};

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