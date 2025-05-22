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
    const formLogin = document.querySelector(".login");

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value;

        try {
            const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Inicio de sesión exitoso");
                localStorage.setItem("token", data.token || ""); // Si devuelves token
                window.location.href = "/index.html"; // Página principal tras el login
            } else {
                alert("Email o contraseña incorrectos");
            }

        } catch (error) {
            console.error("Error de red:", error);
            alert("No se pudo conectar al servidor");
        }
    });
});
