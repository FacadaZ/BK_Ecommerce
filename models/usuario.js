const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        correo: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['admin', 'vendedor', 'sub admin']]
            }
        }
    }, {
        tableName: 'USUARIO',
        timestamps: false
    });
};