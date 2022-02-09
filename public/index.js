const socket = io()

function addProduct(e) {
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value
    };
    socket.emit('emitidoDesdeElCliente', producto);
    return false;
}


socket.on('emitidoDesdeElServidor', prod => {
    const productosHTML = prod
        .map(prod => `
        <tr class="warning">
            <td>${prod.producto.nombre}</td>             
            <td>${prod.producto.precio}</td>             
            <td style="width: 33%"><img style="max-width: 50px;" src="${prod.producto.imagen}" alt=""></td>             
        </tr>`)
    document.getElementById('mi-div').innerHTML = productosHTML
})

