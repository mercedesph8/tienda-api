const express = require('express');
const cors = require('cors');
const app = express();

// Importar la función de inicialización de JSON
const initData = require('./initData');

// Ejecutar la inicialización al arrancar el servidor
initData();
app.use(cors());
app.use(express.json());




// Importa el middleware
const logger = require('./middlewares/logger');

// Usa el middleware (para que se ejecute en cada petición)
app.use(logger);






// Importar rutas
app.use('/productos', require('./routes/productosRoutes'));
app.use('/proveedores', require('./routes/proveedoresRoutes'));
app.use('/pedidos', require('./routes/pedidosRoutes'));
app.use('/clientes', require('./routes/clientesRoutes'));
app.use('/carritos', require('./routes/carritosRoutes'));
app.use('/categorias', require('./routes/categoriasRoutes'));
app.use('/usuario', require('./routes/usuariosRoutes'));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("🚀 Servidor Express funcionando correctamente");
});

// Definir el resto de routes
// Mejora solicitada: guardar en un log de JSON todas las llamadas a la API
// (puedes implementar un middleware de logging aquí si quieres)

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
