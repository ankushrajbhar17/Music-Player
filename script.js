const songs = [
    { title: "Song 1", src: "path/to/song1.mp3" },
    { title: "Song 2", src: "path/to/song2.mp3" },
    { title: "Song 3", src: "path/to/song3.mp3" },
    { title: "Song 4", src: "path/to/song4.mp3" },
    { title: "Song 5", src: "path/to/song5.mp3" },
    { title: "Song 6", src: "path/to/song6.mp3" },
    { title: "Song 7", src: "path/to/song7.mp3" },
    { title: "Song 8", src: "path/to/song8.mp3" },
    { title: "Song 9", src: "path/to/song9.mp3" },
    { title: "Song 10", src: "path/to/song10.mp3" },
];

const songList = document.getElementById('song-list');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const trackTitle = document.getElementById('track-title');

songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.addEventListener('click', () => selectSong(index));
    songList.appendChild(li);
});

let currentSongIndex = null;

function selectSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].src;
    trackTitle.textContent = `Now Playing: ${songs[index].title}`;
    playSong();
}

function playSong() {
    if (currentSongIndex !== null) {
        audio.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
}

playBtn.addEventListener('click', () => {
    playSong();
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
});

audio.addEventListener('ended', () => {
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
});
