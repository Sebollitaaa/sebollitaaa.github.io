// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {

  // Referencia al input de búsqueda
  const inputBusqueda = document.querySelector(".busqueda input");

  // Referencia al botón de la lupa
  const botonBusqueda = document.querySelector(".busqueda .lupa");

  // Selecciona todas las tarjetas de productos (con clase .card)
  const cards = document.querySelectorAll(".card");

  // Función para filtrar productos según el texto escrito
  function filtrarProductos() {
    const texto = inputBusqueda.value.toLowerCase().trim(); // Convierte el texto a minúsculas y elimina espacios

    cards.forEach(card => {
      const nombre = card.dataset.nombre.toLowerCase(); // Toma el nombre del producto desde el atributo data-nombre
      // Muestra u oculta la tarjeta dependiendo si el nombre incluye el texto buscado
      card.style.display = nombre.includes(texto) ? "flex" : "none";
    });
  }

  // Cuando se hace clic en la lupa
  botonBusqueda.addEventListener("click", () => {
    const texto = inputBusqueda.value.trim(); // Obtiene el texto sin espacios
    if (texto) {
      // Redirige a la página productos.html con el parámetro de búsqueda en la URL
      window.location.href = `productos.html?buscar=${encodeURIComponent(texto)}`;
    }
  });

  // Si el usuario presiona la tecla Enter dentro del input
  inputBusqueda.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const texto = inputBusqueda.value.trim();
      if (texto) {
        // También redirige a productos.html con el texto como parámetro
        window.location.href = `productos.html?buscar=${encodeURIComponent(texto)}`;
      }
    }
  });

});
