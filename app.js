document.addEventListener("DOMContentLoaded", function () {
    const cartas = document.querySelectorAll('.carta');
    let cartaSeleccionada = null;
    let cartaPareja = null;
    let parejasEncontradas = 0;
    let puntos = document.querySelector(".ranking");

    // Para cargar y mostrar el ranking
    let mostrarPuntos = "<h1>Ranking</h1>";
    for (let j of ranking["jugadores"]) {
        mostrarPuntos += `${j["posicion"]} ${j["nombre"]}<br>
        ${j["puntuacion"]}<br><br>`
    }
    
    puntos.innerHTML = mostrarPuntos;

    for (let carta of cartas) {
        const imagenFrontal = carta.querySelector('.imagen-frontal');
        const imagenTrasera = carta.querySelector('.imagen-trasera');

        // Para ocultar imagen trasera al principio
        imagenTrasera.style.display = "none";

        // Para agregar evento de clic a la imagen frontal
        imagenFrontal.addEventListener('click', function () {
            // Para mostrar imagen trasera
            imagenTrasera.style.display = 'block';
            // Para ocultar imagen frontal
            imagenFrontal.style.display = 'none';
        });

        // Para agregar evento de clic a la imagen trasera
        imagenTrasera.addEventListener('click', function () {
            // Para ocultar imagen trasera
            imagenTrasera.style.display = 'none';
            // Para mostrar imagen frontal
            imagenFrontal.style.display = 'block';
        });
    }

    function voltearCarta() {
        const imagenFrontal = this.querySelector('.imagen-frontal');
        const imagenTrasera = this.querySelector('.imagen-trasera');

        if (cartaPareja || this === cartaSeleccionada) return;

        imagenTrasera.style.display = 'block';
        imagenFrontal.style.display = 'none';

        if (!cartaSeleccionada) {
            cartaSeleccionada = this;
        } else {
            cartaPareja = this;
            comprobarPareja();
        }
    }

    function comprobarPareja() {
        const img1 = cartaSeleccionada.querySelector('.imagen-trasera img').getAttribute('src');
        const img2 = cartaPareja.querySelector('.imagen-trasera img').getAttribute('src');

        if (img1 === img2) {
            cartaSeleccionada.removeEventListener('click', voltearCarta);
            cartaPareja.removeEventListener('click', voltearCarta);
            cartaSeleccionada = null;
            cartaPareja = null;
            parejasEncontradas++;
            if (parejasEncontradas === cartas.length / 2) {
                alert("¡Felicidades, has encontrado todas las parejas!");
            }
        } else {
            setTimeout(() => {
                ocultarCartas();
                cartaSeleccionada = null;
                cartaPareja = null;
            }, 400);
        }
    }

    function ocultarCartas() {
        const imagenFrontal1 = cartaSeleccionada.querySelector('.imagen-frontal');
        const imagenTrasera1 = cartaSeleccionada.querySelector('.imagen-trasera');
        const imagenFrontal2 = cartaPareja.querySelector('.imagen-frontal');
        const imagenTrasera2 = cartaPareja.querySelector('.imagen-trasera');

        imagenTrasera1.style.display = 'none';
        imagenFrontal1.style.display = 'block';
        imagenTrasera2.style.display = 'none';
        imagenFrontal2.style.display = 'block';
    }

    for (let i = 0; i < cartas.length; i++) {
        cartas[i].addEventListener('click', voltearCarta);
    }
});


