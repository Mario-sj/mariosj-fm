document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false;
    let sound;

    // Configura las rutas de las imágenes
    const playIcon = 'images/play-icon.png';
    const pauseIcon = 'images/pause-icon.png';

    // Establece la imagen inicial en el botón
    playPauseBtn.innerHTML = `<img src="${playIcon}" alt="Play">`;

    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            sound.pause();
            playPauseBtn.innerHTML = `<img src="${playIcon}" alt="Play">`;
        } else {
            if (!sound) {
                sound = new Howl({
                    src: ['https://stream.zeno.fm/l13zjhvjpvluv'],
                    html5: true,
                    volume: volumeSlider.value, // Volumen inicial
                });
            }
            sound.play();
            playPauseBtn.innerHTML = `<img src="${pauseIcon}" alt="Pause">`;
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', function() {
        if (sound) {
            sound.volume(volumeSlider.value);
        }
    });
});

// Seleccionar el elemento donde se mostrará el título de la canción
const songInfo = document.getElementById('song-info');

// Seleccionar el elemento del reproductor
const playerElement = document.getElementById('player');

// Definir los fondos asociados a cada canción
const backgrounds = {
    "Carlos Cava de Llano - El Generalísimo": "url('images/SPA.png')",
    "Come Out Ye Black and Tans": "url('images/IRE.png')",
    "Así Marcha España": "url('images/SPA.png')",
    "La Banderita": "url('images/SPA.png')",
    "Cadets of the Guards School": "url('images/RUS.png')",
    "Red Army Choir - Армия моя": "url('images/RUS.png')",
    "北京の55日": "url('images/JAP.png')",
    "Oj Alija, aljo": "url('images/SER.png')",
    "Perica Ivanović - Srpska Granata": "url('images/SER.png')",
    "Remove Kebab - Serbia strong": "url('images/SER.png')",
    "Primavera": "url('images/SPA.png')",
    "Maréchal, nous voilà!": "url('images/FRA.png')",
    "Julius Fučik - Winterstürme": "url('images/Fucik.png')",
    "Julius Fučik - Hercegovac March": "url('images/Fucik.png')",
    "Julius Fučik - Der alte Brummbär": "url('images/Fucik.png')",
    "Lorenzo Valverde - 55 Días En Pekín": "url('images/SPA.png')",
    "Mi General Augusto Pinochet": "url('images/CHL.png')",
    "Allan Gray - Swing Doors": "url('images/jazz.png')",
    "Keith Nichols - Swing Kings": "url('images/jazz.png')",
    // Añade más canciones y sus fondos correspondientes
};

// URL del flujo SSE para obtener la información de la canción actual
const sseUrl = "https://api.zeno.fm/mounts/metadata/subscribe/l13zjhvjpvluv";

// Crear una nueva conexión EventSource
const eventSource = new EventSource(sseUrl);


// Manejar los eventos de mensaje recibidos
eventSource.onmessage = function(event) {
    try {
        const data = JSON.parse(event.data);
        if (data && data.streamTitle) {
            const streamTitle = data.streamTitle.trim(); // Título de la canción
            
            // Mostrar el título de la canción
            songInfo.textContent = streamTitle;

            // Cambiar el fondo del reproductor
            if (backgrounds[streamTitle]) {
                // Cambiar la imagen de fondo
                playerElement.style.backgroundImage = backgrounds[streamTitle];
                console.log(`Fondo cambiado para ${streamTitle}`);
            } else {
                // Fondo por defecto con una combinación de la imagen y el color sólido
                playerElement.style.backgroundImage = 'url(\'images/default-background.jpg\')';
                console.log("Fondo por defecto");
            }
        } else {
            songInfo.textContent = "No se encontró información de la canción.";
            playerElement.style.backgroundImage = 'url(\'images/default-background.jpg\')';
            console.log("No se encontró información de la canción.");
        }
    } catch (e) {
        console.error("Error al procesar el evento:", e);
        songInfo.textContent = "Error al procesar la información de la canción.";
        playerElement.style.backgroundImage = 'url(\'images/default-background.jpg\')';
        console.log("Error al procesar el evento.");
    }
};

// Manejar errores en la conexión SSE
eventSource.onerror = function(event) {
    console.error("Error en la conexión SSE:", event);
    songInfo.textContent = "Error al conectar con el servidor.";
    playerElement.style.backgroundImage = 'url(\'images/default-background.jpg\')';
    console.log("Error en la conexión SSE.");
};
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-selector');
    const langFlags = document.querySelectorAll('#language-selector img');
    
    let currentLanguage = 'es'; // Idioma predeterminado

    // Cargar la traducción del idioma seleccionado
    function loadLanguage(lang) {
        fetch(`languages/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('[data-translate]').forEach(el => {
                    // No traducir elementos que se actualizan dinámicamente
                    if (el.id !== 'song-info') {
                        const key = el.getAttribute('data-translate');
                        el.textContent = data[key] || el.textContent;
                    }
                });
            })
            .catch(error => {
                console.error('Error al cargar el archivo de idioma:', error);
            });
    }

    // Inicializar el idioma predeterminado
    loadLanguage(currentLanguage);

    // Agregar eventos a las banderas
    langFlags.forEach(flag => {
        flag.addEventListener('click', function() {
            currentLanguage = this.id;
            loadLanguage(currentLanguage);
        });
    });
});





console.log('Datos cargados:', data);
console.log('Elemento encontrado:', document.querySelector('h1'));


