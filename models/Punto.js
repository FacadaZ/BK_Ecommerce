const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Punto', {
        id_punto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        motivo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        puntos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        id_admin: {
            type: DataTypes.INTEGER
        },
        id_temporada: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'PUNTO',
        timestamps: false
    });
};