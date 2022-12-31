const playerButton = document.querySelector('.player-button'),
audio = document.getElementById('main-audio'),
timeline = document.querySelector('.timeline'),
timelineVolume = document.querySelector('.timeline-volume');

function toggleAudio () {
  if (audio.paused) {
    audio.play();
    playerButton.classList.add('paused');
  } else {
    audio.pause();
    playerButton.classList.remove('paused');
  }
}

playerButton.addEventListener('click', toggleAudio);

function changeTimelinePosition () {
  const percentagePosition = (100*audio.currentTime) / audio.duration;
  timeline.style.backgroundSize = `${percentagePosition}% 100%`;
  timeline.value = percentagePosition;
}

audio.ontimeupdate = changeTimelinePosition;

function audioEnded () {
    playerButton.classList.remove('paused');
}

audio.onended = audioEnded;

function changeSeek () {
    const time = (timeline.value * audio.duration) / 100;
    audio.currentTime = time;
}

timeline.addEventListener('change', changeSeek);

function changeTimelineVolumePosition () {
    // const percentagePosition = (100*audio.currentTime) / audio.duration;
    console.log(audio.volume);
    // const size = audio.volume * 100;
    timelineVolume.style.backgroundSize = `${audio.volume*100}% 100%`;
    timelineVolume.value = audio.volume;
  }
  
audio.onvolumechange = changeTimelineVolumePosition;

function changeVolume () {
    const volume = timelineVolume.value / 100;
    audio.volume = volume;
    console.log("volume sekarang",audio.volume);
}

timelineVolume.addEventListener('change', changeVolume);