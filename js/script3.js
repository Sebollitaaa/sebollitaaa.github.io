document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const respuesta = document.getElementById("respuesta");
  const campoNombre = document.getElementById("nombre");

  // Bloquea números en el campo nombre y marca en rojo si hay caracteres inválidos
  campoNombre.addEventListener("input", function () {
    this.value = this.value.replace(/[0-9]/g, "");
    if (/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/.test(this.value)) {
      this.style.border = "2px solid red";
    } else {
      this.style.border = "";
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const emailValido = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
    const mensajeValido = mensaje.length >= 20;
    const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre);

    if (nombreValido && emailValido && mensajeValido) {
      respuesta.textContent = "¡Mensaje enviado!";
      respuesta.className = "exito";
      form.reset();
      setTimeout(() => respuesta.textContent = "", 4000);
    } else {
      respuesta.textContent = "Complete la información de manera correcta";
      respuesta.className = "error";
      setTimeout(() => respuesta.textContent = "", 4000);
    }
  });

  // Búsqueda de productos
  const inputBusqueda = document.querySelector(".busqueda input");
  const botonBusqueda = document.querySelector(".busqueda .lupa");
  const cards = document.querySelectorAll(".card");

  function filtrarProductos() {
    const texto = inputBusqueda.value.toLowerCase().trim();
    cards.forEach(card => {
      const nombre = card.dataset.nombre.toLowerCase();
      card.style.display = nombre.includes(texto) ? "flex" : "none";
    });
  }

  botonBusqueda.addEventListener("click", () => {
    const texto = inputBusqueda.value.trim();
    if (texto) {
      window.location.href = `productos.html?buscar=${encodeURIComponent(texto)}`;
    }
  });

  inputBusqueda.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const texto = inputBusqueda.value.trim();
      if (texto) {
        window.location.href = `productos.html?buscar=${encodeURIComponent(texto)}`;
      }
    }
  });
});
