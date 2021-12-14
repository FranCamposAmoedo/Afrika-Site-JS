/* Espero que cargue el DOM y si había objetos en el Local Storage que los traiga */
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (localStorage.getItem('carrito')) {
      carrito = JSON.parse(localStorage.getItem('carrito'));
      mostrarCarrito();
    }
  })

  /* Traigo la información desde una api local */
const fetchData = async () => {
    try {
      const res = await fetch('/api.json');
      const data = await res.json();
      agregarCards(data);
    } catch (error) {
      console.log(error);
    }
  }