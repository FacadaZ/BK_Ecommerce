const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Insignia', {
        id_insignia: {
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
        icono_url: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'INSIGNIA',
        timestamps: false
    });
};