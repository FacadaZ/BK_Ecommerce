const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Cliente', {
        id_cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo_cliente: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        numero_whatsapp: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'CLIENTE',
        timestamps: false
    });
};