const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Pedido', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CLIENTE',
                key: 'id_cliente'
            }
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendiente',
            validate: {
                isIn: [['pendiente', 'aprobado', 'cancelado']]
            }
        },
        total: {
            type: DataTypes.DECIMAL(10, 2)
        }
    }, {
        tableName: 'PEDIDO',
        timestamps: false
    });
};