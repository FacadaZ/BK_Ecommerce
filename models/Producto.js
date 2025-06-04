const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Producto', {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING 
        },
        destacado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            references: {
                model: 'CATEGORIA',
                key: 'id_categoria'
            }
        },
        stock_tallas: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '{}'
        } 
    }, {
        tableName: 'PRODUCTO',
        timestamps: false
    });
};