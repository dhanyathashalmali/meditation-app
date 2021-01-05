const app = () => {
    const track = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // get the length of the outline
    const outlineLength = outline.getTotalLength();
    //Duration

    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            track.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(track);
        })
    })

    // play sound
    play.addEventListener('click', () => {
        checkPlaying(track);
    });

    // select duration
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            let seconds = Math.floor(fakeDuration % 60);
            let minutes = Math.floor(fakeDuration / 60);
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }
            timeDisplay.textContent = `${minutes}:${seconds}`;
        })
    })

    // Create a function specific to stop and play the sounds
    const checkPlaying = song => {
            if (song.paused) {
                song.play();
                video.play();
                play.src = "./svg/pause.svg";
            } else {
                song.pause();
                video.pause();
                play.src = "./svg/play.svg";
            }
        }
        // We can animate the circle
    track.ontimeupdate = () => {
        let currentTime = track.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        // animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            track.pause();
            track.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    }
};

app();