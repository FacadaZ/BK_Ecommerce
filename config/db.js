const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.PGDATABASE,   
    process.env.PGUSER,       
    process.env.PGPASSWORD,   
    {
        host: process.env.PGHOST,
        port: process.env.PGPORT, 
        dialect: "postgres",
        logging: false,
    }
);


sequelize.authenticate()
    .then(() => {
        console.log("Conexión a la base de datos establecida.");
        return sequelize.sync();
    })
    .then(() => {
        console.log("Tablas sincronizadas correctamente.");
    })
    .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
    });

module.exports = { sequelize, Sequelize };