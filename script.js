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