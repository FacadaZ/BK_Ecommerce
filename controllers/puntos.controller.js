const { Punto, Cliente, Temporada, Usuario } = require('../models');

exports.asignarPuntos = async (req, res) => {
    try {
        const { id_cliente, motivo, puntos, id_admin, id_temporada } = req.body;

        const cliente = await Cliente.findByPk(id_cliente);
        if (!cliente) {
            return res.status(400).json({ error: 'Cliente no encontrado.' });
        }

        const admin = await Usuario.findByPk(id_admin);
        if (!admin) {
            return res.status(400).json({ error: 'Admin no encontrado.' });
        }

        const temporada = await Temporada.findByPk(id_temporada);
        if (!temporada) {
            return res.status(400).json({ error: 'Temporada no encontrada.' });
        }

        const punto = await Punto.create({
            id_cliente,
            motivo,
            puntos,
            fecha: new Date(),
            id_admin,
            id_temporada
        });
        res.status(201).json(punto);
    } catch (error) {
        console.error('Error al asignar puntos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.listarPuntosPorCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const puntos = await Punto.findAll({
            where: { id_cliente },
            include: [
                { model: Temporada, attributes: ['nombre'] },
                { model: Usuario, as: 'admin', attributes: ['nombre'] }
            ]
        });
        res.status(200).json(puntos);
    } catch (error) {
        console.error('Error al listar puntos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.topUsuariosTemporada = async (req, res) => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const fecha_inicio = new Date(year, month, 1).toISOString().slice(0, 10);

        const temporada = await Temporada.findOne({
            where: { fecha_inicio }
        });

        if (!temporada) {
            return res.status(404).json({ error: 'No existe la temporada actual.' });
        }

        const top = await Punto.findAll({
            where: { id_temporada: temporada.id_temporada },
            attributes: [
                [Punto.sequelize.col('Punto.id_cliente'), 'id_cliente'],
                [Punto.sequelize.fn('SUM', Punto.sequelize.col('puntos')), 'total_puntos']
            ],
            include: [
                { model: Cliente, attributes: ['nombre', 'codigo_cliente', 'numero_whatsapp'] }
            ],
            group: [
                'Punto.id_cliente',
                'Cliente.id_cliente',
                'Cliente.nombre',
                'Cliente.codigo_cliente',
                'Cliente.numero_whatsapp'
            ],
            order: [[Punto.sequelize.literal('total_puntos'), 'DESC']],
            limit: 10
        });

        res.status(200).json(top);
    } catch (error) {
        console.error('Error al obtener el top de usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.listarPuntosPorCodigoCliente = async (req, res) => {
    try {
        const { codigo_cliente } = req.params;
        const { id_temporada } = req.query;
        const cliente = await Cliente.findOne({ where: { codigo_cliente } });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        const where = { id_cliente: cliente.id_cliente };
        if (id_temporada) where.id_temporada = id_temporada;
        const puntos = await Punto.findAll({
            where,
            include: [
                { model: Temporada, attributes: ['nombre'] },
                { model: Usuario, as: 'admin', attributes: ['nombre'] }
            ]
        });
        res.status(200).json(puntos);
    } catch (error) {
        console.error('Error al listar puntos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.topUsuariosPorTemporada = async (req, res) => {
    try {
        const { id_temporada } = req.params;
        const top = await Punto.findAll({
            where: { id_temporada },
            attributes: [
                [Punto.sequelize.col('Punto.id_cliente'), 'id_cliente'],
                [Punto.sequelize.fn('SUM', Punto.sequelize.col('puntos')), 'total_puntos']
            ],
            include: [
                { model: Cliente, attributes: ['nombre', 'codigo_cliente', 'numero_whatsapp'] }
            ],
            group: [
                'Punto.id_cliente',
                'Cliente.id_cliente',
                'Cliente.nombre',
                'Cliente.codigo_cliente',
                'Cliente.numero_whatsapp'
            ],
            order: [[Punto.sequelize.literal('total_puntos'), 'DESC']],
            limit: 10
        });
        res.status(200).json(top);
    } catch (error) {
        console.error('Error al obtener el top de usuarios por temporada:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};