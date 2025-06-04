const { Categoria, Producto } = require("../models");

exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const categoriaExistente = await Categoria.findOne({ where: { nombre } });
        if (categoriaExistente) {
            return res.status(400).json({ error: "La categoría ya existe" });
        }

        const nuevaCategoria = await Categoria.create({ nombre, descripcion });

        return res.status(201).json({
            message: "Categoría creada exitosamente",
            categoria: nuevaCategoria,
        });
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            include: [
                {
                    model: Producto,
                    as: "productos",
                },
            ],
        });
        return res.status(200).json(categorias);
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        categoria.nombre = nombre;
        categoria.descripcion = descripcion;
        await categoria.save();

        return res.status(200).json({
            message: "Categoría actualizada exitosamente",
            categoria,
        });
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        await categoria.destroy();

        return res.status(200).json({
            message: "Categoría eliminada exitosamente",
        });
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id, {
            include: [
                {
                    model: Producto,
                    as: "productos",
                },
            ],
        });
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        return res.status(200).json(categoria);
    } catch (error) {
        console.error("Error al obtener la categoría:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};