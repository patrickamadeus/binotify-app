const callback = (data) => {{
    console.log(data);
    const result = JSON.parse(data);
    if (result.status != "success"){
        audioPlayer.src = "";
        warning.textContent = "No Playback Remaining";
        document.getElementsByClassName("player-button").item(0).style.display= "none";
        console.log("token musik habis");
    } else{
        console.log("berhasil ngeplay");
        audioPlayer.play();
    }
}}

const playbackHandler = (song_id) => {
    getAPI(`php/song/verifySongPlayback.php?song_id=${song_id}`, callback);
    return;
}

const audioPlayer = document.getElementById("main-audio")
const currentSong = document.getElementById("music_detail__title")
const warning = document.getElementById("guestPlaybackWarning")

audioPlayer.addEventListener("playing", (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search).get("id");


    playbackHandler(urlParams);
})