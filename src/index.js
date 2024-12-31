const express = require('express');
const mongoose = require('mongoose');
const productoRutas = require('./routes/productoRutas');

const app = express();

//Middlewares
app.use(express.json());

//conexion a mongoDS
mongoose.connect('mongodb://127.0.0.1:27017/inventario', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Conectado a MongoDB'))
.catch(db => console.error('Error al conectar a MongoDB', err));

//Rutas
app.use('/api/productos', productoRutas);

//iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});