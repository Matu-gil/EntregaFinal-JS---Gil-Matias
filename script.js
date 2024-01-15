const carrito = [""];
const productos =["Audi A4 - 49500", "BMW M4 - 54000", "Ford Mustang - 51000", "Chevrolet Camaro - 50000", "Aston Martin DB9 - 75000", "Volskwagen Sirocco - 39000", "Renault Megane RS - 37000", "Mercedes C200 - 66000", "Ferrari 488 GTO - 89000", "Fiat 600 - 100000"];

bienvenido();

function bienvenido() {
  console.log("Bienvenido al consecionario El Matuu");
  console.log("Nuestro catalogo de vehiculos es el siguiente: ");

  mostrarCatalogo();

 const comprar = prompt("Desea comprar algun vehiculo? si/no");
  
  if(comprar==="si") {
    let vehiculoNro = prompt("Que vehiculo desea comprar? Ingrese el numero de la lista mostrada");
    comprarVehiculo(vehiculoNro);
  } else {
    mostrarMensaje("Que tenga un buen dia!");
    }
}
  
  
function mostrarCatalogo() {
    for(let i=0; i<productos.length; i++) {
      console.log("-------------------");
      console.log(i + " - " + productos[i]);
    }
}

function comprarVehiculo(producto) {
  for(let i=0; i<productos.length; i++) {
    if(producto == i) {
      let precio = productos[i].slice(-6);
      let valor = parseInt(precio);
      if(valor >= 60000 ) {
        precio = aplicarDescuento(valor);
        console.log("-------------------")
        alert("Genial, se te ah aplicado un descuento de $" + precio + " por tu compra, Gracias Vuelvas Prontos!");
      } else {
        alert("Felicitaciones, usted compro un flamante " + productos[i] + " que lo disfrutes rey!");
      }
    }
  } 
}
function aplicarDescuento(precio) {
  precio = precio / 15;
  return precio;
}