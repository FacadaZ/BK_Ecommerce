const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PedidoProducto', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'PEDIDO',
                key: 'id_pedido'
            }
        },
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'PRODUCTO',
                key: 'id_producto'
            }
        },
        talla: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'PEDIDO_PRODUCTO',
        timestamps: false
    });
};