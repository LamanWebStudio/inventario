const botonMenu = document.querySelector(".burger-boton");
const abrirMenu = document.querySelector(".nav-oculto")

botonMenu.addEventListener("click", (e) => {
    e.stopPropagation()
    abrirMenu.classList.toggle("visible");
    botonMenu.classList.toggle("btBurger");
});

document.addEventListener("click", (e) =>{
    if (!abrirMenu.contains(e.target) && !botonMenu.contains(e.target)){
        abrirMenu.classList.remove("visible");
        botonMenu.classList.remove("btBurger");
    }
});


// Bloquea letras en el input de teléfono
document.getElementById("telefonoCliente").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Manejador del formulario
document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario || !usuario.name) {
    alert("⚠️ Debes iniciar sesión antes de registrar un cliente");
    return;
  }

  // Capturar los valores del formulario
  const nombre = document.getElementById("nombreCliente").value.trim();
  const telefono = document.getElementById("telefonoCliente").value.trim();
  const notas = document.getElementById("notasCliente").value.trim();

  // Validaciones
  if (!nombre || !telefono) {
    alert("⚠️ Por favor, completa el nombre y el teléfono del cliente");
    return;
  }

  if (!/^\d{7,15}$/.test(telefono)) {
    alert("⚠️ El teléfono debe contener solo números y tener entre 7 y 15 dígitos");
    return;
  }

  // Armar datos a enviar
  const datosCliente = {
    nombre,
    telefono,
    notas,
    empleado: usuario.name
  };

  try {
    const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/enviar-correo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosCliente)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al enviar datos");
    }

    alert("✅ Cliente registrado y correo enviado con éxito");

    // Limpia los campos del formulario si todo va bien
    document.getElementById("formCliente").reset();

  } catch (err) {
    console.error("❌ Error en envío:", err);
    alert("❌ Ocurrió un error al enviar los datos: " + err.message);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || !usuario.name) {
    // Desactiva todos los campos del formulario
    document.querySelectorAll("#formCliente input, #formCliente textarea, #formCliente button").forEach(el => {
      el.disabled = true;
    });

    alert("⚠️ Debes iniciar sesión para poder usar el formulario");
  }
});

