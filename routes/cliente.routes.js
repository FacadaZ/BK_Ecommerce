const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller");

// Obtener todos los clientes
router.get("/", clienteController.obtenerClientes);

module.exports = router;
