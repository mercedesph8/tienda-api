module.exports = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // continúa con el siguiente middleware o ruta
};