require('dotenv').config();

const express = require("express");
const app = express();
const port = 3000;
const { sequelize } = require('./models');
const cors = require("cors");
const adminRouter = require("./routes/admin.routes");
const productoRouter = require("./routes/producto.routes");
const categoriaRouter = require("./routes/categoria.routes");
const pedidoRouter = require("./routes/pedido.routes");
const clienteRouter = require("./routes/cliente.routes");
const pedidoRoutes = require('./routes/pedido.routes');
const puntosRoutes = require('./routes/puntos.routes');
const temporadaRoutes = require('./routes/temporada.routes');
const insigniaRoutes = require('./routes/insignia.routes');
const cuponRoutes = require('./routes/cupones.routes');
const path = require('path');



app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})); 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("hola mundo");
});

app.use("/admin", adminRouter);
app.use("/producto", productoRouter);
app.use("/categoria", categoriaRouter);
app.use('/pedidos', pedidoRouter);

app.use('/clientes', clienteRouter); 

app.use('/api/pedidos', pedidoRoutes);

app.use('/puntos', puntosRoutes);

app.use('/temporada', temporadaRoutes);

app.use('/uploads', express.static('uploads'));

app.use('/cupones', cuponRoutes);

app.use('/api', insigniaRoutes);


sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
});