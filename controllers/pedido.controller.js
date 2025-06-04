
const { Pedido, PedidoProducto, Producto, Cliente, Punto } = require('../models');
exports.crearPedido = async (req, res) => {
    try {
        const { nombre, numero_whatsapp, productos, total, cupon, id_temporada } = req.body;

        if (!nombre || !numero_whatsapp || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        let cliente = await Cliente.findOne({ where: { numero_whatsapp } });
        if (!cliente) {
            const codigo_cliente =
                nombre.trim().substring(0, 3).toLowerCase() +
                numero_whatsapp.slice(-4);

            const clienteExistente = await Cliente.findOne({ where: { codigo_cliente } });
            if (clienteExistente) {
                return res.status(400).json({ error: 'El código de cliente ya existe.' });
            }

            cliente = await Cliente.create({
                nombre,
                numero_whatsapp,
                codigo_cliente
            });
        }

        const nuevoPedido = await Pedido.create({
            id_cliente: cliente.id_cliente,
            total,
            estado: 'pendiente'
        });

        for (const item of productos) {
            await PedidoProducto.create({
                id_pedido: nuevoPedido.id_pedido,
                id_producto: item.id_producto,
                talla: item.talla,
                cantidad: item.cantidad,
                precio_unitario: item.precio_unitario
            });
        }

        // DESCONTAR PUNTOS SI SE USÓ CUPÓN
        if (cupon && cupon.puntos && cupon.codigo) {
            await Punto.create({
                id_cliente: cliente.id_cliente,
                motivo: `Uso de cupón ${cupon.codigo}`,
                puntos: -Math.abs(Number(cupon.puntos)), 
                fecha: new Date(),
                id_admin: null,
                id_temporada: id_temporada || null
            });
        }

        return res.status(201).json({ message: 'Pedido y cliente creados exitosamente', pedido: nuevoPedido });
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: PedidoProducto,
                    include: [Producto]
                },
                {
                    model: Cliente
                }
            ]
        });
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.obtenerPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id, {
            include: [
                {
                    model: PedidoProducto,
                    include: [Producto]
                },
                {
                    model: Cliente
                }
            ]
        });
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.cambiarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const pedido = await Pedido.findByPk(id, {
            include: [{ model: PedidoProducto }]
        });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Si pasa de pendiente/cancelado a aprobado, descuenta stock
        if (pedido.estado !== 'aprobado' && estado === 'aprobado') {
            for (const item of pedido.PedidoProductos) {
                const producto = await Producto.findByPk(item.id_producto);
                if (producto) {
                    let stockTallas = JSON.parse(producto.stock_tallas || '{}');
                    if (stockTallas[item.talla] !== undefined) {
                        stockTallas[item.talla] -= item.cantidad;
                        if (stockTallas[item.talla] < 0) stockTallas[item.talla] = 0;
                        producto.stock_tallas = JSON.stringify(stockTallas);
                        await producto.save();
                    }
                }
            }
        }

        // Si pasa de aprobado a cancelado, devuelve stock
        if (pedido.estado === 'aprobado' && estado === 'cancelado') {
            for (const item of pedido.PedidoProductos) {
                const producto = await Producto.findByPk(item.id_producto);
                if (producto) {
                    let stockTallas = JSON.parse(producto.stock_tallas || '{}');
                    if (stockTallas[item.talla] !== undefined) {
                        stockTallas[item.talla] += item.cantidad;
                        producto.stock_tallas = JSON.stringify(stockTallas);
                        await producto.save();
                    }
                }
            }
        }

        pedido.estado = estado;
        await pedido.save();

        res.status(200).json({ message: 'Estado actualizado correctamente' });
    } catch (error) {
        console.error('Error al cambiar el estado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.eliminarPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        await PedidoProducto.destroy({ where: { id_pedido: id } });

        await Pedido.destroy({ where: { id_pedido: id } });

        res.status(200).json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.obtenerPedidosAprobadosPorCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const pedidos = await Pedido.findAll({
            where: { 
                id_cliente,
                estado: 'aprobado' 
            },
            include: [
                {
                    model: PedidoProducto,
                    include: [Producto]
                }
            ]
        });
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos aprobados del cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};