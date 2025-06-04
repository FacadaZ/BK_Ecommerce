const express = require('express');
const router = express.Router();
const puntoController = require('../controllers/puntos.controller');

// Asignar puntos (solo admin)
router.post('/', puntoController.asignarPuntos);

// Listar puntos de un cliente
router.get('/cliente/:id_cliente', puntoController.listarPuntosPorCliente);

router.get('/top-temporada', puntoController.topUsuariosTemporada);

router.get('/codigo/:codigo_cliente', puntoController.listarPuntosPorCodigoCliente);

router.get('/top-temporada/:id_temporada', puntoController.topUsuariosPorTemporada);

module.exports = router;