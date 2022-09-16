require('./config/conexion');
const express = require('express');const cors = require('cors');

const port = (process.env.port || 3000);

//express
const app = express()

//admitir
app.use(express.json())

app.use(cors({
    origin: '*'
}));

//configurar
app.set('port',port)

//rutas
app.use('/api', require('./rutas'));

//inicar express
app.listen(app.get('port'),(error => {
    if(error) {
        console.log('error al iniciar servidor: '+error);
    } else {
        console.log('servidor iniciado en el puerto: '+port);
    }
}));