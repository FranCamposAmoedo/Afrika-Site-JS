/* Evento para agregar objetos al carrito */
cards.addEventListener('click', (e) => {
  agregarCarrito(e);
})

/* Evento para aumentar o disminuir objetos en el carrito */
items.addEventListener('click', (e) => {
  btnAccion(e);
})

/* Si el evento contiene el botón, dispara la función setCarrito para capturar los elementos*/
const agregarCarrito = (e) => {
  if (e.target.classList.contains('botones-productos')) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation()
}

/* Pusheo los elementos que necesito a la colección de objetos en carrito */
const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector('.botones-productos').dataset.id,
    nombre: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('.botones-productos').textContent,
    cantidad: 1,
  }

  /* Si el producto ya fue agregado, suma 1 en cantidad */
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  /* Spread Operator */
  carrito[producto.id] = {
    ...producto
  }
  mostrarCarrito();
}

/* Carga los productos en una tabla a medida que se van clickeando */
const mostrarCarrito = () => {
  items.innerHTML = '';
  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('th').textContent = producto.id;
    templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  })
  items.appendChild(fragment);
  mostrarTotal();

  /* Guarda en el LocalStorage los datos del carrito */
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

/* Función para sumar las cantidades y los precios */
const mostrarTotal = () => {
  total.innerHTML = '';
  /* Si está vacío devuelve ese texto */
  if (Object.keys(carrito).length === 0) {
    total.innerHTML = `<th scope="row" colspan="5">Carrito vacío. Elija algunos productos!</th>`
    btnComprar.classList.add('comprar-oculto');
    return;
  } else {
    btnComprar.classList.remove('comprar-oculto');
  }

  /* Acumula y suma la cantidad */
  const nCantidad = Object.values(carrito).reduce((acc, {
    cantidad
  }) => acc + cantidad, 0)
  /* acumula y multiplica la cantidad por el precio que da el total */
  const nPrecio = Object.values(carrito).reduce((acc, {
    cantidad,
    precio
  }) => acc + cantidad * precio, 0)

  templateTotal.querySelectorAll('td')[0].textContent = nCantidad;
  templateTotal.querySelector('b').textContent = nPrecio;
  const clone = templateTotal.cloneNode(true);
  fragment.appendChild(clone);
  total.appendChild(fragment);

  /* Para vaciar el carrito */
  const btnVaciar = document.getElementById('vaciar-carrito');
  btnVaciar.addEventListener('click', () => {
    carrito = {}
    mostrarCarrito()
  })

}

/* Evento para sumar o restar productos en el carrito */
const btnAccion = (e) => {
  if (e.target.classList.contains('btn-info')) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = {
      ...producto
    }
    mostrarCarrito();
  }
  if (e.target.classList.contains('btn-danger')) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    mostrarCarrito();
  }

  e.stopPropagation();
}

/* Botón comprar, con un alert que da diferentes opciones */
btnComprar.addEventListener('click', () => {
  swal("¿Está seguro que desear finalizar la compra?", {
      buttons: {
        cancel: "Cancelar",
        finish: {
          text: "Finalizar compra",
          value: "finish",
        },
        restart: {
          text: "Volver a empezar",
          value: "restart"
        },
      },
    })
    .then((value) => {
      switch (value) {

        case "restart":
          swal("El carrito está vacío. Elija un producto");
          carrito = {};
          mostrarCarrito();
          break;

        case "finish":
          swal("¡Tu pedido llegará pronto!", "¡Gracias por elegirnos!", "success");
          carrito = {};
          mostrarCarrito();
          break;

        default:
          break;
      }
    });
})