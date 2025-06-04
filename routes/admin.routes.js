const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");


router.post("/", adminController.registrarUsuario);

router.get("/", adminController.obtenerAdmins);

router.post("/login", adminController.loginUsuario);

router.get("/:id", adminController.obtenerUsuarioPorId);

router.put("/:id", adminController.actualizarUsuario);

router.delete("/:id", adminController.eliminarUsuario);

module.exports = router;