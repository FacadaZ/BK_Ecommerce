const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('UsuarioInsignia', {
        id_cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_insignia: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_temporada: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        fecha_otorgada: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        tableName: 'USUARIO_INSIGNIA',
        timestamps: false
    });
};