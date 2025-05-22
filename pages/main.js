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



document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector(".registro");

    formRegistro.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value;

        const nuevoUsuario = {
            name,
            email,
            password
        };

        try {
            const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoUsuario)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Usuario registrado con éxito");
                window.location.href = "/login.html"; // Cambia esto si tu login está en otra ruta
            } else {
                alert("Error al registrar: " + data.message);
            }

        } catch (error) {
            console.error("Error de red:", error);
            alert("No se pudo conectar al servidor");
        }
    });
});
