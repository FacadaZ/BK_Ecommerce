const { sequelize } = require('../config/db');
const Temporada = require("./Temporada")(sequelize);
const Cliente = require('./Cliente')(sequelize);
const Insignia = require('./Insignia')(sequelize);
const UsuarioInsignia = require('./UsuarioInsignia')(sequelize);
const Punto = require('./Punto')(sequelize);
const Categoria = require('./Categoria')(sequelize);
const Producto = require("./Producto")(sequelize);
const Pedido = require('./pedido')(sequelize);
const PedidoProducto = require("./pedidoProducto")(sequelize);
const Cupon = require('./Cupon')(sequelize);
const Usuario = require("./Usuario")(sequelize);


// Asociaciones para Punto, Categoria, UsuarioInsignia
Punto.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Punto.belongsTo(Usuario, { foreignKey: 'id_admin', as: 'admin' }); // CORRECTO: Usuario como admin
Punto.belongsTo(Temporada, { foreignKey: 'id_temporada' });

Categoria.hasMany(Producto, { as: "productos", foreignKey: "id_categoria" });
Producto.belongsTo(Categoria, { foreignKey: "id_categoria", as: "categoria" });

UsuarioInsignia.belongsTo(Cliente, { foreignKey: 'id_cliente' });
UsuarioInsignia.belongsTo(Insignia, { foreignKey: 'id_insignia' });
UsuarioInsignia.belongsTo(Temporada, { foreignKey: 'id_temporada' });

// NUEVAS ASOCIACIONES PARA PEDIDOS
Pedido.hasMany(PedidoProducto, { foreignKey: 'id_pedido' });
PedidoProducto.belongsTo(Pedido, { foreignKey: 'id_pedido' });

PedidoProducto.belongsTo(Producto, { foreignKey: 'id_producto' });
Producto.hasMany(PedidoProducto, { foreignKey: 'id_producto' });

Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });

module.exports = {
    sequelize,
    Usuario,
    Temporada,
    Cliente,
    Insignia,
    UsuarioInsignia,
    Punto,
    Categoria,
    Producto,
    Pedido,
    PedidoProducto,
    Cupon,
};