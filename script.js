
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        datos = data;
        for (const auto of datos) {
            let contenedor = document.createElement("div");
            contenedor.className = "card";
            contenedor.innerHTML = `
                <div style="width: 18rem;">
                    <img src="${auto.imagen}" class="card-img-top">
                    <div class="car">
                        <h5 class="card-title">${auto.id} ${auto.nombre}</h5>
                        <p class="card-text">${auto.precio}</p>
                    </div>
                </div>`;
            document.body.appendChild(contenedor);
        }
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));


let contenedor1 = document.getElementById("contenedor1");

contenedor1.innerHTML = `
    <h1 class = "bienvenida">BIENVENIDO AL CONCESIONARIO DE EKKO</h1>
    <h2>Aquí encontrarás una alta gama de Vehículos</h2>
    <p>Ingrese a continuación su Nombre y Apellido</p>
    <input id="nombreYApellido" type="text">
    <button id="enter">Enter</button>`;

const contenedor3 = document.getElementById("contenedor3");
let boton = document.getElementById("enter");

boton.addEventListener("click", function () {
        let nombreYApellido = document.getElementById("nombreYApellido").value;
        let contenedor2 = document.getElementById("contenedor2");
    
    if( nombreYApellido === "") {
        Swal.fire({
            icon: "error",
            title: "WTF",
            text: "No has ingresado tu Nombre y Apellido, vuelve a intentarlo",
        })
    }else {
        contenedor2.innerHTML = `
      <p>Bienvenido ${nombreYApellido} al concesionario de tus sueños!</p>
      <p>Desea comprar un vehículo el día de hoy?</p>
      <button id="si">SI</button>
      <button id="no">NO</button>`;

    let botonSi = document.getElementById("si");
    let botonNo = document.getElementById("no");

    botonSi.addEventListener("click", function () {
        contenedor3.innerHTML = `
        <h3>Gracias por decidir comprar con nosotros. Ingrese a continuación el Nro del Vehículo que desea comprar</h3>
        <input id="numeroVehiculo" type="number" min="1" max="10" step="1">
        <button id="confirmar">Confirmar</button>`;

        let botonConfirmar = document.getElementById("confirmar");
        botonConfirmar.addEventListener("click", function () {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "La compra se ah realizado con exito",
                showConfirmButton: false,
                timer: 1500
              });
            let numeroVehiculo = parseInt(document.getElementById("numeroVehiculo").value);
            let vehiculoSeleccionado = datos.find( auto => auto.id === numeroVehiculo);
            if (vehiculoSeleccionado) {
                comprarVehiculo(vehiculoSeleccionado, datos);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Número de vehículo no válido. Por favor, ingrese un número válido.",
                })
            }
        });
    });

    botonNo.addEventListener("click", function () {
        Swal.fire("Gracias por tu visita");
    });
    }
});


function comprarVehiculo(vehiculo, datos) {
    let contenedor4 = document.getElementById("contenedor4");
    let contenido ="";
    let precio = parseFloat(vehiculo.precio.replace("USD", "").replace(",", ""));

    if (precio >= 60000) {
         precio = aplicarDescuento(precio);
        contenido =`
            <h3>Felicitaciones por tu compra!</h3>
            <div class="card" style="width: 18rem;">
            <img src="${vehiculo.imagen}" class="card-img-top">
            <div class="car">
                <h5 class="card-title">${vehiculo.id} ${vehiculo.nombre}</h5>
                <p class="card-text">Precio: $${vehiculo.precio}</p>
            </div>
            </div>
            <p>Gracias por tu compra, se te ha aplicado un descuento de $${precio.toFixed(2)} al superar los 60.000. ¡Vuelve pronto!</p>
            </div>`;
    } else {
        contenido = `
            <div class="contenedor4">
            <h3>Felicitaciones por tu compra!</h3>
            <div class="card" style="width: 18rem;">
                <img src="${vehiculo.imagen}" class="card-img-top">
                <div class="car">
                    <h5 class="card-title">${vehiculo.id} ${vehiculo.nombre}</h5>
                    <p class="card-text">Precio: ${vehiculo.precio}</p>
                </div>
            </div>
            <p>¡Disfruta tu nuevo vehículo!</p>
            </div>`;
    }
            
    contenedor4.innerHTML = contenido;
        guardarEnLocalStorage (vehiculo);
}

function aplicarDescuento(precio) {
    return precio / 15;
}
function guardarEnLocalStorage(vehiculo) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(vehiculo);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
