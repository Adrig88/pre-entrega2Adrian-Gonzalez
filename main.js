function saludo(nombre) {
  document.getElementById('message').innerText = `Ya casi es tuyo!!!: ${nombre}`;
}

function iniciarCompra(carrito) { 
  const seleccion = prompt("Elige lo que deseas:\n1. Remeras\n2. Canguros\n3. Gorros");
  
  switch (seleccion) {
      case '1':
          seleccionarArticulo('remeras', carrito);
          break;
      case '2':
          seleccionarArticulo('canguros', carrito);
          break;
      case '3':
          seleccionarArticulo('gorros', carrito);
          break;
      default:
          alert("Selección inválida. Intenta nuevamente.");
          iniciarCompra(carrito);
          break;
  }
}

class Articulo {
  constructor(indumentaria, categoria, talles, precio) {
      this.indumentaria = indumentaria;
      this.categoria = categoria;
      this.talles = talles;
      this.precio = precio;
  }    
  mostrarTalles() {
      return this.talles.join(", ");
  }
}

const talles = ["S", "M", "L", "XL"];
const articulosDisponibles = {
  remeras: [
      new Articulo("Remera", "Manga Corta", talles, 30),
      new Articulo("Remera", "Manga Larga", talles, 35)
  ],
  canguros: [
      new Articulo("Canguro", "Canguro Puro Rock", talles, 55),
      new Articulo("Canguro", "Cnaguro Futbol Life", talles, 65)
  ],
  gorros: [
      new Articulo("Gorros", "Piluso" , talles, 15),
      new Articulo("Gorros", "Gorro Lana" , talles, 12)
  ]
};

class Compra {
  constructor(medioPago, nombre, apellido, ci, whatsapp) {
      this.medioPago = medioPago;
      this.nombre = nombre;
      this.apellido = apellido;
      this.ci = ci;
      this.whatsapp = whatsapp;
  }
}

function solicitarDato(mensaje) {
  return prompt(mensaje) || "";
}

function mostrarTallesParaArticulo(articulo, carrito) {
  const talleSeleccionado = prompt("Elige el talle:\n" + articulo.mostrarTalles());
  if (articulo.talles.includes(talleSeleccionado)) {
      carrito.push(articulo);
      return true;
  } else {
      alert("Talle inválido. Intenta nuevamente.");
      return false;
  }
}

function mostrarDetallesCompra(carrito) {
  const iva = 0.21;
  const total = carrito.reduce((sum, articulo) => sum + articulo.precio, 0);
  const totalConIva = total * (1 + iva);
  
  const mediosPago = ['Transferencia', 'Tarjeta de débito/crédito'];
  const medioPagoIndex = parseInt(solicitarDato(`Selecciona el medio de pago:\n1. ${mediosPago[0]}\n2. ${mediosPago[1]}`)) - 1;
  const medioPago = mediosPago[medioPagoIndex] || 'No especificado';

  const compra = new Compra(medioPago, solicitarDato("Ingrese su nombre:"), solicitarDato("Ingrese su apellido:"), solicitarDato("Ingrese su C.I:"), solicitarDato("Ingrese su whatsapp:"));
  const ahora = new Date().toLocaleString();

  const detallesDiv = document.getElementById('details');
  detallesDiv.innerHTML = `
      <h2>Detalles de la compra</h2>
      <p>Total con IVA: US$${totalConIva.toFixed(2)}</p>
      <p>Nombre: ${compra.nombre}</p>
      <p>Apellido: ${compra.apellido}</p>
      <p>C.I: ${compra.ci}</p>
      <p>Whatsapp: ${compra.whatsapp}</p>
      <p>Modo de Pago: ${medioPago}</p>
      <p>Fecha y Hora: ${ahora}</p>
      <p>Gracias, nos comunicaremos con usted para finalizar la operación.</p>
  `;
}

function seleccionarArticulo(categoria, carrito) {
  const opciones = articulosDisponibles[categoria];
  const seleccion = parseInt(prompt(`Selecciona un ${categoria}:\n${opciones.map((op, index) => `${index + 1}. ${op.indumentaria} ${op.categoria} - $${op.precio}`).join('\n')}`)) - 1;
  
  if (seleccion >= 0 && seleccion < opciones.length) {
      const articulo = opciones[seleccion];
      if (mostrarTallesParaArticulo(articulo, carrito)) {
          agregarOtroArticulo(carrito);
      }
  } else {
      alert("Opción inválida. Intenta nuevamente.");
      iniciarCompra(carrito);
  }
}

function agregarOtroArticulo(carrito) {
  if (confirm("¿Deseas agregar otro artículo a la compra?")) {
      iniciarCompra(carrito);
  } else {
      mostrarDetallesCompra(carrito);
  }
}

function iniciarApp() {
  const nombre = solicitarDato("Ingrese su nombre:");
  saludo(nombre);
  const carrito = [];
  iniciarCompra(carrito);
}
