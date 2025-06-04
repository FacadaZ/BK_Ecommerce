const express = require('express');
const router = express.Router();
const cuponController = require('../controllers/cupon.controller');

router.get('/', cuponController.obtenerCupones);
router.post('/', cuponController.crearCupon);
router.put('/:id', cuponController.actualizarCupon);
router.delete('/:id', cuponController.eliminarCupon);




module.exports = router;