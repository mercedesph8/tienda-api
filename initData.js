// initData.js
const fs = require('fs');
const path = require('path');

function initData() {
  // Carpeta donde estarán los JSON
  const dataDir = path.join(__dirname, 'data');

  // Archivos que queremos inicializar
  const files = [
    'productos.json',
    'categorias.json',
    'clientes.json',
    'pedidos.json',
    'carritos.json',
    'proveedores.json'
  ];

  // Asegurarse de que la carpeta 'data' exista
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log('Carpeta "data" creada');
  }

  // Crear archivos vacíos si no existen
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf8'); // JSON vacío: un array vacío
      console.log(`Archivo "${file}" creado`);
    } else {
      console.log(`Archivo "${file}" ya existe`);
    }
  });
}

// Exportar la función para poder usarla desde server.js
module.exports = initData;
