const { UsuarioInsignia, Insignia, Temporada } = require('../models');

exports.otorgarInsignia = async (req, res) => {
    try {
        const { id_cliente, id_insignia, id_temporada } = req.body;
        const fecha_otorgada = new Date();
        const nueva = await UsuarioInsignia.create({ id_cliente, id_insignia, id_temporada, fecha_otorgada });
        res.status(201).json(nueva);
    } catch (err) {
        res.status(500).json({ error: 'Error al otorgar insignia' });
    }
};

exports.obtenerInsigniasPorUsuario = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const insignias = await UsuarioInsignia.findAll({
            where: { id_cliente },
            include: [
                { model: Insignia },
                { model: Temporada }
            ]
        });
        res.json(insignias);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener insignias del usuario' });
    }
};
exports.otorgarInsigniaTopTemporada = async (req, res) => {
    console.log('body recibido', req.body);
    try {
        const { id_cliente, id_temporada, puesto } = req.body;
        if (!id_cliente || !id_temporada || !puesto) {
            return res.status(400).json({ error: 'Faltan datos requeridos: id_cliente, id_temporada o puesto.' });
        }

        const temporada = await Temporada.findByPk(id_temporada);
        if (!temporada) {
            return res.status(404).json({ error: 'Temporada no encontrada.' });
        }

        const hoy = new Date();
        const fechaFin = new Date(temporada.fecha_fin);
        if (hoy <= fechaFin) {
            return res.status(400).json({ error: 'La temporada aún no ha finalizado. No se pueden otorgar insignias.' });
        }

        const nombre_temporada = temporada.nombre;
        const nombreInsignia = `TOP ${puesto} ${nombre_temporada}`;
        const descripcion = `Obtuvo el puesto ${puesto} en la temporada ${nombre_temporada}`;

        let insignia = await Insignia.findOne({ where: { nombre: nombreInsignia } });
        if (!insignia) {
            insignia = await Insignia.create({ nombre: nombreInsignia, descripcion });
        }

        const yaTiene = await UsuarioInsignia.findOne({
            where: {
                id_cliente,
                id_insignia: insignia.id_insignia,
                id_temporada
            }
        });
        if (yaTiene) {
            return res.status(200).json({ message: 'El usuario ya tiene esta insignia', insignia });
        }

        await UsuarioInsignia.create({
            id_cliente,
            id_insignia: insignia.id_insignia,
            id_temporada,
            fecha_otorgada: new Date()
        });

        res.status(201).json({ message: 'Insignia otorgada', insignia });
    } catch (error) {
        console.error('Error en otorgarInsigniaTopTemporada:', error);
        res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
    }
};