const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { error } = require("console");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const handlebars = require("express-handlebars");
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile("/index.html", { root: __dirname });
});
const listaProductos = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
    })
);

io.on("connection", (socket) => {
    console.log("¡Nuevo cliente conectado!");
    
    socket.emit("emitidoDesdeElServidor", listaProductos) //nombre del evento + data
    
    socket.on("emitidoDesdeElCliente", (data) => {
        listaProductos.push({socketid: socket.id, producto: data})
        io.sockets.emit("emitidoDesdeElServidor", listaProductos);
    });
});


// app.get("/", (req, res) => {
//     res.render("form.hbs");
// });

// app.post("/productos", (req, res) => {
//     let ultimoId;
//     let ultimoProducto = listaProductos[listaProductos.length - 1];

//     if (listaProductos.length == 0) {
//         ultimoId = 0;
//     } else {
//         ultimoId = ultimoProducto.id;
//     }

//     let title = req.body.title;
//     let price = req.body.price;
//     let thumbnail = req.body.thumbnail;
//     let producto = {
//         title: title,
//         price: price,
//         thumbnail: thumbnail,
//         id: ultimoId + 1,
//     };
//     listaProductos.push(producto);
//     res.redirect("/");
// });

// app.get("/productos", (req, res) => {
//     if (listaProductos.length > 0) {
//         productosCargados = listaProductos.map(function (producto) {
//             return `
//             <tr>
//                 <td>${producto.title}</td>             
//                 <td>${producto.price}</td>             
//                 <td><img style="max-width: 50px;" src="${producto.thumbnail}" alt=""></td>             
//             </tr>`;
//         });
//         res.render("productos.hbs", { productosCargados });
//     } else {
//         productosCargados = "<h2 class='text-center'>No hay productos</h2>";
//         res.render("productos.hbs", { productosCargados });
//     }
// });

app.set("views", "./views");
app.set("view engine", "hbs");



const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))

