// Espera que todo el HTML esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  let carrito = []; // Arreglo que guarda los productos agregados
  let total = 0;     // Suma total del carrito

  // === ELEMENTOS DEL DOM ===
  const carritoToggle = document.getElementById("carritoToggle"); // Botón flotante del carrito
  const contador = document.getElementById("contador-carrito");   // Nro. de ítems en el carrito
  const lista = document.getElementById("lista-carrito");         // UL donde se listan los productos
  const totalCarrito = document.getElementById("total-carrito");  // Muestra el total en $
  const menuCarrito = document.getElementById("menu-carrito");    // Menú desplegable del carrito
  const botonesAgregar = document.querySelectorAll(".producto button"); // Botones "Agregar al carrito"
  const botonCerrar = document.querySelector("#menu-carrito button");   // Botón "Cerrar" del carrito

  // === MOSTRAR / OCULTAR EL CARRITO CUANDO SE HACE CLICK EN EL BOTÓN ===
  carritoToggle.addEventListener("click", function () {
    const rect = carritoToggle.getBoundingClientRect(); // Obtiene la posición del botón flotante

    if (menuCarrito.classList.contains("visible")) {
      menuCarrito.classList.remove("visible"); // Si ya está abierto, lo cierra
    } else {
      // Posiciona el carrito justo debajo del botón flotante
      menuCarrito.style.top = `${rect.bottom + 10 + window.scrollY}px`;
      menuCarrito.style.left = `${rect.left + window.scrollX}px`;
      menuCarrito.classList.add("visible");
    }
  });

  // === FUNCIÓN PARA CERRAR EL MENÚ DEL CARRITO ===
  function cerrarCarrito() {
    menuCarrito.classList.remove("visible");
  }

  // Cierra el carrito al hacer clic en el botón "Cerrar"
  botonCerrar.addEventListener("click", cerrarCarrito);

  // Cierra automáticamente el carrito si se hace clic fuera de él
  document.addEventListener("click", function (e) {
    if (
      !menuCarrito.contains(e.target) &&         // Si el clic no fue dentro del menú
      !carritoToggle.contains(e.target)          // Ni en el botón flotante
    ) {
      menuCarrito.classList.remove("visible");
    }
  });

  // === AGREGAR PRODUCTOS AL CARRITO ===
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = boton.closest(".producto"); // Encuentra el contenedor del producto
      const nombre = producto.querySelector("h3").textContent; // Nombre del producto
      const precio = parseFloat(
        producto.querySelector("span").textContent.replace("$", "")
      ); // Precio del producto

      carrito.push({ nombre, precio }); // Agrega el producto al array del carrito
      total += precio;                 // Suma el precio al total
      contador.textContent = carrito.length; // Actualiza el contador del botón flotante
      actualizarCarrito();             // Refresca el contenido del carrito
    });
  });

  // === FUNCIÓN PARA ELIMINAR UN PRODUCTO DEL CARRITO ===
  function eliminarItemCarrito(index) {
    total -= carrito[index].precio;  // Resta el precio del producto eliminado
    carrito.splice(index, 1);        // Elimina el producto del array
    contador.textContent = carrito.length; // Actualiza el contador
    actualizarCarrito();             // Refresca la lista del carrito
  }

  // === ACTUALIZA EL CONTENIDO DEL MENÚ CARRITO ===
  function actualizarCarrito() {
    lista.innerHTML = ""; // Limpia el contenido actual

    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - $${item.precio}`;

      // Crea el botón de eliminar para cada producto
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "X";
      botonEliminar.style.marginLeft = "10px";
      botonEliminar.style.cursor = "pointer";

      // Cuando se hace clic en "X", elimina el producto
      botonEliminar.addEventListener("click", () => {
        eliminarItemCarrito(index);
      });

      li.appendChild(botonEliminar);
      lista.appendChild(li); // Agrega el producto a la lista visual del carrito
    });

    // Actualiza el total en el carrito
    totalCarrito.textContent = total.toFixed(2);
  }

  // === FUNCIÓN PARA QUE EL BOTÓN DEL CARRITO SEA ARRASTRABLE CON MOUSE ===
  let isDragging = false;
  let offsetX, offsetY;

  carritoToggle.style.position = "fixed"; // Asegura que sea flotante

  carritoToggle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - carritoToggle.offsetLeft;
    offsetY = e.clientY - carritoToggle.offsetTop;
    carritoToggle.style.transition = "none"; // Evita animación al mover
    e.preventDefault(); // Evita comportamientos no deseados
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      carritoToggle.style.left = `${e.clientX - offsetX}px`;
      carritoToggle.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      carritoToggle.style.transition = "all 0.2s"; // Añade una pequeña transición al soltar
    }
  });

  // === SOPORTE TÁCTIL PARA DISPOSITIVOS MÓVILES ===
  carritoToggle.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - carritoToggle.offsetLeft;
    offsetY = touch.clientY - carritoToggle.offsetTop;
    carritoToggle.style.transition = "none";
  }, { passive: true });

  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      carritoToggle.style.left = `${touch.clientX - offsetX}px`;
      carritoToggle.style.top = `${touch.clientY - offsetY}px`;
    }
  }, { passive: true });

  document.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      carritoToggle.style.transition = "all 0.2s";
    }
  });

});
