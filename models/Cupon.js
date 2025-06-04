const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Cupon', {
        id_cupon: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        puntos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'CUPON',
        timestamps: false
    });
};