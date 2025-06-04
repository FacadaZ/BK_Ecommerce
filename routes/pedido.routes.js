const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');

router.post('/', pedidoController.crearPedido);

router.get('/cliente/:id_cliente', pedidoController.obtenerPedidosAprobadosPorCliente);

router.get('/', pedidoController.obtenerPedidos);
router.get('/:id', pedidoController.obtenerPedidoPorId);
router.put('/:id/estado', pedidoController.cambiarEstadoPedido);
router.delete("/:id", pedidoController.eliminarPedidoPorId);

module.exports = router;