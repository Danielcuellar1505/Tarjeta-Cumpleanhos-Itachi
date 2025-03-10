let music = new Audio('temaitachi.mp3'); // Nombre de tu archivo de música
let musicStarted = false; // Variable para verificar si la música ya está activa

// Cuando se presiona el botón "Activar Genjutsu Cumpleañero"
document.getElementById('activateEffect').addEventListener('click', function() {
    let body = document.body;
    let phrase = document.getElementById('phrase');
    let sound = new Audio('genjutsu.mp3'); // Sonido opcional
    sound.play();

    // Cambiar la frase aleatoriamente
    const phrases = [
        "Que la voluntad del fuego ilumine tu camino en este nuevo año de vida. ¡Feliz cumpleaños! 🔥🎉",
        "Recuerda que el verdadero crecimiento viene con cada experiencia. ¡Que este año esté lleno de grandes logros y aprendizajes! 🎂✨",
        "Eres más fuerte de lo que imaginas. Que este cumpleaños te recuerde todo lo increíble que eres. 🎊🎁",
        "La realidad puede ser una ilusión, pero hoy no hay duda: es un día especial porque celebramos tu existencia. ¡Felicidades! 🎈🎉",
        "Los lazos que construimos son nuestro mayor tesoro. Hoy celebra con quienes más quieres. ¡Feliz cumpleaños, kunoichi Legendaria! 🎂🔥"
    ];
    phrase.innerText = phrases[Math.floor(Math.random() * phrases.length)];

    // Efecto de pantalla roja como Genjutsu
    body.style.animation = "redFlash 1s infinite alternate";
    setTimeout(() => {
        body.style.animation = "";
    }, 3000);

    // Generar cuervos animados
    generateCrows();

    // Iniciar música si no ha comenzado
    if (!musicStarted) {
        music.loop = true; // Reproducir en bucle
        music.play(); // Reproducir música
        musicStarted = true; // Marcar que la música ha comenzado
    }
});

// Efecto de pantalla roja
document.head.insertAdjacentHTML("beforeend", `
    <style>
        @keyframes redFlash {
            0% { background-color: black; }
            100% { background-color: red; }
        }

        /* Animación de los cuervos */
        @keyframes crowMovement {
            0% {
                transform: translate(0, 0); /* Empieza en la esquina inferior izquierda */
            }
            100% {
                transform: translate(calc(100vw * var(--direction-x)), calc(100vh * var(--direction-y))); /* Se mueve hacia todas las direcciones */
            }
        }

        .crow {
            position: absolute;
            width: 100px; /* Tamaño del cuervo, duplicado */
            height: auto;
            animation: crowMovement 2.5s linear infinite; /* Velocidad duplicada */
        }
    </style>
`);

// Función para generar cuervos animados
function generateCrows() {
    // Usamos requestAnimationFrame para mejorar el rendimiento
    function createCrow() {
        let crow = document.createElement('img');
        crow.src = "crow.png"; // Asegúrate de tener un PNG de un cuervo
        crow.classList.add('crow');
        
        // Empieza en la esquina superior izquierda
        crow.style.left = Math.random() * window.innerWidth + "px"; // Empieza en una posición aleatoria en el eje X
        crow.style.top = "0px"; // Empieza en la parte superior de la pantalla

        // Asignar direcciones aleatorias para los cuervos
        let directionX = Math.random() * 1.5; // Valor entre 0 y 1.5 (horizontal, más hacia la derecha)
        let directionY = Math.random() * 2 - 1; // Valor entre -1 y 1 (vertical)
        
        crow.style.setProperty('--direction-x', directionX);
        crow.style.setProperty('--direction-y', directionY);

        crow.style.animationDelay = Math.random() * 1 + "s"; // Aleatorizar el inicio de la animación
        document.getElementById('crows-container').appendChild(crow);

        // Elimina el cuervo después de la animación
        setTimeout(() => {
            crow.remove();
        }, 2500); // La animación dura 2.5 segundos
    }

    // Llamamos a createCrow cada 150ms para generar los cuervos
    let crowInterval = setInterval(createCrow, 150); 

    // Limitar la cantidad de cuervos generados a 30 por ejemplo
    setTimeout(() => {
        clearInterval(crowInterval); // Detener la creación de cuervos después de 10 segundos
    }, 10000);
}
