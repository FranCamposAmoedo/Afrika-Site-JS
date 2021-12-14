/* Cargo de manera dinámica todas las cards con sus especificaciones utilizando fragment */
const agregarCards = data => {
    data.forEach(producto => {
      templateCard.querySelector('img').setAttribute('src', producto.imagen);
      templateCard.querySelector('h5').textContent = producto.nombre;
      templateCard.querySelector('.madera').textContent = producto.madera;
      templateCard.querySelector('.diametro').textContent = producto.diametro;
      templateCard.querySelector('.ancho').textContent = producto.ancho;
      templateCard.querySelector('.peso').textContent = producto.peso;
      templateCard.querySelector('.botones-productos').textContent = producto.precio;
      templateCard.querySelector('button').dataset.id = producto.id;
      const clone = templateCard.cloneNode(true);
      fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
  }