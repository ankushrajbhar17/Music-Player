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
const uploadBtn = document.getElementById('upload-btn');
const uploadTrigger = document.getElementById('upload-trigger');

let longPressTimer;
const LONG_PRESS_DURATION = 600; // milliseconds

songs.forEach((song, index) => {
    addSongToList(index);
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

// Handle file upload
uploadTrigger.addEventListener('click', () => {
    uploadBtn.click(); // Trigger the hidden file input
});

uploadBtn.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const songUrl = URL.createObjectURL(file);
        const songTitle = file.name; // Use the file name as the title
        songs.push({ title: songTitle, src: songUrl }); // Add to the songs array
        addSongToList(songs.length - 1); // Update the playlist UI
        selectSong(songs.length - 1); // Automatically play the uploaded song
    }
});

// Function to delete a song
function deleteSong(index) {
    songs.splice(index, 1); // Remove the song from the array
    updateSongList(); // Refresh the UI
}

// Function to update the song list in the UI
function updateSongList() {
    songList.innerHTML = ''; // Clear the current list
    songs.forEach((song, index) => {
        addSongToList(index);
    });
}

function addSongToList(index) {
    const li = document.createElement('li');
    li.textContent = songs[index].title;
    li.addEventListener('click', () => selectSong(index));

    // Long press functionality for deleting a song
    li.addEventListener('mousedown', () => {
        longPressTimer = setTimeout(() => {
            deleteSong(index);
        }, LONG_PRESS_DURATION);
    });

    li.addEventListener('mouseup', () => {
        clearTimeout(longPressTimer);
    });

    li.addEventListener('mouseleave', () => {
        clearTimeout(longPressTimer);
    });

    songList.appendChild(li);
}
