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

document.getElementById("formCliente").addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return alert("Debes iniciar sesión");

    const datosCliente = {
        nombre: document.getElementById("nombreCliente").value,
        telefono: document.getElementById("telefonoCliente").value,
        notas: document.getElementById("notasCliente").value,
        empleado: usuario.name
    };

    try {
        const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/enviar-correo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosCliente)
        });

        const data = await res.json();
        alert(data.message || "Datos enviados");

    } catch (err) {
        console.error(err);
        alert("Error al enviar los datos");
    }
});
