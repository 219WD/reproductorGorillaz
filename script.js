// Seleccionar elementos del DOM y asignarlos a variables
let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

// Variables para el estado del reproductor
let trackIndex = 0; // Índice de la pista actual en la lista de pistas
let isPlaying = false; // Indica si la pista está reproduciéndose
let isHidden = true; // Indica si el reproductor está oculto o visible

// Crear un nuevo objeto de audio
let currentTrack = new Audio();

// Seleccionar el elemento de las barras de sonido
let soundBars = document.querySelector(".sound-bars");

// Agregar un evento de clic al botón "togglePlayer" para mostrar u ocultar el reproductor
togglePlayer.addEventListener("click", function () {
  isHidden = !isHidden;
  if (isHidden) {
    // Si está oculto, muestra el reproductor y cambia el ícono del botón
    musicPlayer.classList.remove("hide");
    togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0.4s";
    trackNav.style.transitionDelay = "0.4s";
  } else {
    // Si está visible, oculta el reproductor y cambia el ícono del botón
    musicPlayer.classList.add("hide");
    togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0s";
    trackNav.style.transitionDelay = "0s";
  }
});

// Cargar una animación de barras de sonido utilizando la librería bodymovin
let soundBarsLottie = bodymovin.loadAnimation({
  container: soundBars,
  renderer: "svg",
  loop: true,
  autoPlay: false,
  path: "http://assets5.lottiefiles.com/packages/lf20_jJJl6i.json",
});

// Lista de pistas de música
let trackList = [
  {
    name: "Clint Eastwood",
    artist: "Gorillaz",
    path: "/songs/Gorillaz - Clint Eastwood (Official Video).mp3",
  },
  {
    name: "Feel Good Inc",
    artist: "Gorillaz",
    path: "/songs/Gorillaz - Feel Good Inc. (Official Video).mp3",
  },
  {
    name: "19-2000",
    artist: "Gorillaz",
    path: "/songs/Gorillaz - 19-2000 (Official Video).mp3",
  },
];

// Función para cargar una pista en el reproductor
function loadTrack(trackIndex) {
  currentTrack.pause(); // Pausa la pista anterior
  currentTrack = new Audio(); // Crea un nuevo elemento de audio
  currentTrack.src = trackList[trackIndex].path;
  currentTrack.load();
  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  currentTrack.addEventListener("ended", nextTrack); // Agrega un evento para avanzar a la siguiente pista cuando la pista actual finaliza
}

// Función para reproducir o pausar la pista actual
function playPauseTrack() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

// Función para reproducir la pista actual
function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
  soundBarsLottie.playSegment([0, 120], true); // Inicia la animación de las barras de sonido
}

// Función para pausar la pista actual
function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
  soundBarsLottie.stop(); // Detiene la animación de las barras de sonido
}

// Función para avanzar a la siguiente pista
function nextTrack() {
  trackIndex = (trackIndex + 1) % trackList.length; // Calcula el índice de la siguiente pista circularmente
  loadTrack(trackIndex);
  playTrack();
}

// Función para retroceder a la pista anterior
function prevTrack() {
  trackIndex = (trackIndex - 1 + trackList.length) % trackList.length; // Calcula el índice de la pista anterior circularmente
  loadTrack(trackIndex);
  playTrack();
}

// Cargar la pista inicial al iniciar la página
loadTrack(trackIndex);
