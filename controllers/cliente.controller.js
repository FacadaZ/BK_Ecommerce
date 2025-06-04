const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

exports.obtenerClientes = async (req, res) => { 
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

