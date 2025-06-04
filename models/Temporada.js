const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Temporada', {
        id_temporada: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fecha_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        fecha_fin: {
            type: DataTypes.DATEONLY
        }
    }, {
        tableName: 'TEMPORADA',
        timestamps: false
    });
};