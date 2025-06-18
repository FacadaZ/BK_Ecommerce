const { Categoria, Producto } = require("../models");

exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, id_categoria, destacado, stock_tallas } = req.body;
        // Usar la URL de Cloudinary
        const imagen = req.file ? req.file.path : null;

        const categoriaExistente = await Categoria.findByPk(id_categoria);
        if (!categoriaExistente) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        const stockTallasString = stock_tallas
            ? (typeof stock_tallas === 'string' ? stock_tallas : JSON.stringify(stock_tallas))
            : '{}';

        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            id_categoria,
            imagen, // URL de Cloudinary
            destacado,
            stock_tallas: stockTallasString
        });

        return res.status(201).json({
            message: "Producto creado exitosamente",
            producto: nuevoProducto,
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [
                {
                    model: Categoria,
                    as: "categoria"
                }
            ]
        });
        const productosConTallas = productos.map(p => {
            const producto = p.toJSON();
            producto.stock_tallas = JSON.parse(producto.stock_tallas || '{}');
            return producto;
        });
        return res.status(200).json(productosConTallas);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id, {
            include: [
                {
                    model: Categoria,
                    as: "categoria"
                }
            ]
        });

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const productoJSON = producto.toJSON();
        productoJSON.stock_tallas = JSON.parse(productoJSON.stock_tallas || '{}');

        return res.status(200).json(productoJSON);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, id_categoria, destacado, stock_tallas } = req.body;
        // Usar la URL de Cloudinary si hay nueva imagen
        const imagen = req.file ? req.file.path : undefined;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const categoriaExistente = await Categoria.findByPk(id_categoria);
        if (!categoriaExistente) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        const updateData = {
            nombre,
            descripcion,
            precio,
            id_categoria,
            destacado,
            stock_tallas: typeof stock_tallas === 'string'
                ? stock_tallas
                : JSON.stringify(stock_tallas || {})
        };
        if (imagen) updateData.imagen = imagen;
        if (stock_tallas) {
            updateData.stock_tallas = typeof stock_tallas === 'string'
                ? stock_tallas
                : JSON.stringify(stock_tallas);
        }

        await producto.update(updateData);

        const productoActualizado = producto.toJSON();
        productoActualizado.stock_tallas = JSON.parse(productoActualizado.stock_tallas || '{}');

        return res.status(200).json({
            message: "Producto actualizado exitosamente",
            producto: productoActualizado,
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        await producto.destroy();
        return res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};