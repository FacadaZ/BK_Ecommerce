const express = require('express');
const router = express.Router();
const temporadaController = require('../controllers/temporada.controller');

router.get('/', temporadaController.obtenerTemporadaActual);

router.get('/all', temporadaController.obtenerTodasLasTemporadas);

module.exports = router;