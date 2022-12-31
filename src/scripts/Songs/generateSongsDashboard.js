/**
 * Generate dashboard item for dashboard page
 * @param {Array.<{song_id:number, judul:string, penyanyi:string, tanggal_terbit:string, genre:string, duration:int, audio_path:string, image_path: string, album_id:int}>} songsArray 
 * Array of listed songs
 */

 const generateSongsDashboard = (songsArray, limit, all, page = 1) => {
    let items = "";
  
    let count = songsArray.length < limit ? songsArray.length : limit;
    const songPerPage = 10;
    console.log(songsArray);
    if (all) {
      count = songsArray.length;
    }

    for (let i = 0; i < count; i++) {
      seconds = songsArray[i].duration;
      minutes = parseInt(seconds / 60);
      seconds = seconds % 60;

      items += `
      <div class="song_list__line">
        <div class="song_list__number">${(page - 1) * songPerPage + i+1}</div>
        <a href="detail.html?id=${songsArray[i].song_id}" class="song_list__link">
          <div class="song_list__item">
            <img src="${songsArray[i].image_path}" class="song_list__img" alt="${songsArray[i].judul}" onerror="this.src='static/images/no-song.png';"/>
            <section>
              <h1 class=song_list__title>${
                songsArray[i].judul
              }</h1>
              <h1 class=song_list__singer>${songsArray[i].penyanyi}</h1>
            </section>
          </div>
        </a>
        <div class="song_list__genre">${songsArray[i].genre}</div>
        <div class="song_list__date">${songsArray[i].tanggal_terbit}</div>
        <div class="song_list__dur">${minutes} : ${seconds}</div>
      </div>
      `;
  }
    document.getElementById("dashboard__itemcontainer").innerHTML = items;
  };