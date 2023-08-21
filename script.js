let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = new Audio();
let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function () {
  isHidden = !isHidden;
  if (isHidden) {
    musicPlayer.classList.remove("hide");
    togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0.4s";
    trackNav.style.transitionDelay = "0.4s";
  } else {
    musicPlayer.classList.add("hide");
    togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0s";
    trackNav.style.transitionDelay = "0s";
  }
});

let soundBarsLottie = bodymovin.loadAnimation({
  container: soundBars,
  renderer: "svg",
  loop: true,
  autoPlay: false,
  path: "http://assets5.lottiefiles.com/packages/lf20_jJJl6i.json",
});

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

function loadTrack(trackIndex) {
    currentTrack.pause(); // Pause the previous track
    currentTrack = new Audio(); // Create a new audio element
    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
  }
  
  function playPauseTrack() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }
  
  function playTrack() {
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
    soundBarsLottie.playSegment([0, 120], true);
  }
  
  function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
    soundBarsLottie.stop();
  }
  
  function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
  }
  
  function prevTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
  }
  
  // Load the initial track
  loadTrack(trackIndex);