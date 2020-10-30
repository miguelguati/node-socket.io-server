const { io } = require('../index.js');

//Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado");
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('mensaje',(payload)=>{
        console.log('Mensaje', payload.nombre, payload.edad);

        io.emit('mensaje', {admin:payload.nombre});
    })
});