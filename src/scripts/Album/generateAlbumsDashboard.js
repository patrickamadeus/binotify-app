/**
 * Generate dashboard item for dashboard page
 * @param {Array.<{album_id:number, judul:string, penyanyi:string, total_duration:number, image_path:string, tanggal_terbit:string, genre:string}>} albumsArray 
 * Array of listed songs
 */

 const generateAlbumsDashboard = (albumsArray, limit, all) => {
    let items = "";
  
    let count = albumsArray.length < limit ? albumsArray.length : limit;

    if (all) {
      count = albumsArray.length;
    }

    for (let i = 0; i < count; i++) {
      var dateObj = new Date(albumsArray[i].tanggal_terbit);
      var year = dateObj.getUTCFullYear();

      items += `
      <div class="album_list__card">
        <a href="detail_album.html?id=${albumsArray[i].album_id}" class="album_list__link">
          <div class="album_list__item">
            <div class="album_list__imgcontainer">
              <img src="${albumsArray[i].image_path}" class="album_list__img" alt="${albumsArray[i].judul}" onerror="this.src='static/images/no-song.png';"/>
            </div>
            <section>
              <h1 class=album_list__title>${
                albumsArray[i].judul
              }</h1>
            </section>
            <section class="album_list__info">
              <div class="album_list__date">${
                year
              }</div>
              <span class="dot"></span>
              <h1 class=album_list__singer>${
                albumsArray[i].penyanyi
              }</h1>
            </section>
            <div class="album_list__genre">${
              albumsArray[i].genre
            }</div>
          </div>
        </a>
      </div>
      `;
    }

    document.getElementById("dashboard__itemcontainer").innerHTML = items;
  };