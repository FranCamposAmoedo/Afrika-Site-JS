/* Asignación de constantes y variables (utilizo templates y fragment) */
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const total = document.getElementById('total');
const templateCard = document.getElementById('template-card').content;
const templateTotal = document.getElementById('template-total').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
const btnComprar = document.getElementById('btn-comprar');
let carrito = {};