const setAlbumDetailPage = (albumId) => {
    getAPI(`php/album/getAlbumById.php?id=${albumId}`, 
        (data) => {
            console.log(data);
            const result = JSON.parse(data);
            if (result.status === "success") {  
                const album_detail = result.payload
                
                seconds = album_detail.total_duration;
                minutes = parseInt(seconds / 60);
                seconds = parseInt(seconds % 60);

                document.getElementById("album_detail__img").src = album_detail.image_path;
                document.getElementById("album_detail__title").textContent = album_detail.judul;
                document.getElementById("album_detail__singer").textContent = album_detail.penyanyi;
                document.getElementById("album_detail__release").textContent = album_detail.tanggal_terbit;
                document.getElementById("album_detail__duration").textContent = minutes + ":" + seconds;

                // Song Generator
                let items = "";

                listSong = album_detail.songsArray;
                let count = listSong.length ? listSong.length : 0;
                
                document.getElementById("album_detail__total_song").textContent = count + " Songs";
                
                for (let i = 0; i < count; i++) {
                  seconds = listSong[i].duration;
                  minutes = parseInt(seconds / 60);
                  seconds = parseInt(seconds % 60);

                    items += `<div class="song_list__line">
                      <div class="song_list__number">${i+1}</div>
                      <a href="detail.html?id=${listSong[i].song_id}" class="song_list__link">
                        <div class="song_list__item">
                          <img src="${listSong[i].image_path}" class="song_list__img" alt="${listSong[i].judul}" onerror="this.src='static/images/no-song.png';"/>
                          <section>
                            <h1 class=song_list__title>${
                              listSong[i].judul
                            }</h1>
                            <h1 class=song_list__singer>${listSong[i].penyanyi}</h1>
                          </section>
                        </div>
                      </a>
                      <div class="song_list__genre">${listSong[i].genre}</div>
                      <div class="song_list__date">${listSong[i].tanggal_terbit}</div>
                      <div class="song_list__dur">${minutes}:${seconds}</div>
                    </div>
                    `;
                }
              
                document.getElementById("dashboard__itemcontainer").innerHTML = items;

            } else{
                console.log("error set album detil!")
            }
        }
    );
    return;
}

setAlbumDetailPage(new URLSearchParams(window.location.search).get("id"));
