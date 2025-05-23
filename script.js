const botonMenu = document.querySelector(".burger-boton");
const abrirMenu = document.querySelector(".nav-oculto")

botonMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirMenu.classList.toggle("visible");
    botonMenu.classList.toggle("btBurger");
});

document.addEventListener("click", (e) => {
    if (!abrirMenu.contains(e.target) && !botonMenu.contains(e.target)) {
        abrirMenu.classList.remove("visible");
        botonMenu.classList.remove("btBurger");
    }
});

document.addEventListener("DOMContentLoaded", () => {

    fetch("https://inventario-backend-qf0d.onrender.com/")
        .then(() => console.log("✅ Backend activado"))
        .catch(err => console.log("❌ No se pudo activar el backend:", err));
        
    console.log("✅ DOM cargado");

    const formLogin = document.querySelector(".login");

    if (!formLogin) {
        alert("❌ No se encontró el formulario de login.");
        return;
    }

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email")?.value?.trim();
        const password = document.querySelector("#password")?.value;

        if (!email || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        console.log("📤 Enviando login:", { email, password });

        try {
            const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            console.log("📥 Respuesta del backend:", data);

            if (res.ok) {
                alert("✅ Inicio de sesión exitoso");
                localStorage.setItem("usuario", JSON.stringify(data.user));
                window.location.href = "/index.html";
            } else {
                alert("❌ Login fallido: " + (data.message || "Error desconocido"));
            }

        } catch (error) {
            console.error("🚨 Error al conectarse:", error);
            alert("❌ No se pudo conectar con el servidor.");
        }
    });
});
