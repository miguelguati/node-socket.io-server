const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands= new Bands();

bands.addBands(new Band('Hillsong'));
bands.addBands(new Band('Danilo Montero'));
bands.addBands(new Band('Evan Craft'));
bands.addBands(new Band('Cristine D´clairo'));

console.log(bands);

//Mensajes de sockets
io.on('connection', client => {

    console.log("Cliente conectado");

    // Enviamos la colección de bandas
    client.emit('active-bands', bands.getBand());

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });
    
    // recibimos el voto de cada banda
    client.on('vote-band', (payload)=>{
        console.log(payload.id);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBand());
        //client.broadcast.emit('nuevo-mensaje', payload);// emite a todos menor al emisor
    });

    // recibimos el evento de new band
    client.on('add-band', (payload)=>{
        console.log(payload.name);
        bands.addBands(new Band(payload.name));
        io.emit('active-bands', bands.getBand());
    });
    
    // recibimos el evento de eliminar band
    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBand());
    });

});