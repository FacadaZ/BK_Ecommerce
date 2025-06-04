const express = require('express');
const router = express.Router();
const insigniaController = require('../controllers/insignia.controller');
const usuarioInsigniaController = require('../controllers/usuarioInsignia.controller');

// Insignias
router.post('/insignias', insigniaController.crearInsignia);
router.get('/insignias', insigniaController.obtenerInsignias);

// UsuarioInsignia
router.post('/usuario-insignia', usuarioInsigniaController.otorgarInsignia);
router.get('/usuario-insignia/:id_cliente', usuarioInsigniaController.obtenerInsigniasPorUsuario);

router.post('/usuario-insignia/top-temporada', usuarioInsigniaController.otorgarInsigniaTopTemporada);


module.exports = router;