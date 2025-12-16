const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'mi_secreto_jwt'; 

// "Base de datos" de ejemplo en memoria
let users = [];

// Crear usuario
router.post('/', (req, res) => {
  const { email, password, role } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role: role || 'user'
  };

  users.push(newUser);
  res.status(201).json({ message: 'Usuario creado', user: { id: newUser.id, email: newUser.email, role: newUser.role } });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;