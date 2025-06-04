const express = require('express');
const router = express.Router();
const productoController = require("../controllers/producto.controller");
const upload = require("../config/multer");
const pedidoController = require("../controllers/pedido.controller");

router.get("/", productoController.obtenerProductos);
router.get("/:id", productoController.obtenerProductoPorId);
router.delete("/:id", productoController.eliminarProducto);

router.post('/', upload.single('imagen'), productoController.crearProducto);
router.put('/:id', upload.single('imagen'), productoController.actualizarProducto);



module.exports = router;