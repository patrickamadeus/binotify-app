/**
 * Generate dashboard item for dashboard page
 * @param {Array.<{user_id:number, email:string, password:string, username:string, name:string, isAdmin:boolean}>} artistArray 
 * Array of listed artist(s)
 */
// import getUserId from './userIdHandler.js';

const getMP3Handler = (song_id) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        const musicFile = JSON.parse(this.responseText).content;
        const creatorId = musicFile.penyanyi_id

        xhr.onreadystatechange = function () {
            console.log(this.readyState)
            if (this.readyState !== 4) return;
            const creatorData = JSON.parse(this.responseText).content;
            document.getElementById("music_bar_detail__singer").textContent = creatorData.name;
        };
        xhr.open("GET", `http://localhost:8083/api/penyanyi/getDetailPenyanyiById?penyanyi_id=${creatorId}`);
        xhr.send();

        const path = musicFile.audio_path
        document.getElementById("main-audio").src = `http://localhost:8083/song/${path}`;
        document.getElementById("music_bar_detail__title").textContent = musicFile.judul;
    };
    xhr.open("GET", `http://localhost:8083/api/premiumSong/getPremiumSongDetailById?song_id=${song_id}`);
    xhr.send();
}
  
const generatePremiumSongDashboard = (songsArray, limit, all) => {
    let items = "";
  
    let count = songsArray.length < limit ? songsArray.length : limit;

    console.log(songsArray);
    if (all) {
      count = songsArray.length;
    }

    if (songsArray.length == 0) {
        items = `
        <div class="artist_list__line" id="no__song">    
            <span id="no__song_span">NO SONG</span>
        </div>`
    }

    for (let i = 0; i < count; i++) {
      items += `<div class="artist_list__line" id="line_detail">
            <div class="artist_list__number">${i+1}</div>
            <div class="artist_list__name">${songsArray[i].judul}</div>
            <div class="artist_list__buttons">
                <i class='bx bx-play' style='color:#181818' onclick="getMP3Handler(${songsArray[i].song_id})"></i>
            </div>
        </div>
      `;
  }
    document.getElementById("dashboard__itemcontainer_song").innerHTML = items;
};