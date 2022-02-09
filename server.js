// const express = require("express");
// const { Server: IOServer } = require("socket.io");
// const { Server: HttpServer } = require("http");
// const { error } = require("console");
// const app = express();
// const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);
// //-------------------------------------------------------------------------------------------------------------------//
// app.use(express.static("./public"));

// app.get("/", (req, res) => {
//     res.sendFile("index.html", { root: __dirname });
// });

// const mensajes = []

// io.on("connection", (socket) => {
//     console.log("¡Nuevo cliente conectado!");
    
//     socket.emit("emitidoDesdeElServidor", mensajes) //nombre del evento + data
    
//     socket.on("emitidoDesdeElCliente", (data) => {
//         mensajes.push({socketid: socket.id, mensaje: data})
//         io.sockets.emit("emitidoDesdeElServidor", mensajes);
//     });
// });
// //------------------------------------------------------------------------------------------------------------//
// const PORT = 3000
// const connectedServer = httpServer.listen(PORT, () => {
//     console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
// })
// connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))

// //me quede en el 1:36:20 de la clase 11
