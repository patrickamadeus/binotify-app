const setSongDetailPage = (songId) => {
    getAPI(`php/song/getSongById.php?id=${songId}`, 
        (data) => {
            const result = JSON.parse(data);
            console.log(result)
            if (result.status === "success") {
                console.log("Aman bos!")
                const song_detail = result.payload
                console.log(song_detail)
                seconds = song_detail.duration;
                minutes = parseInt(seconds / 60);
                seconds = seconds % 60;

                document.getElementById("music_detail__img").src = song_detail.image_path
                document.getElementById("music_bar_detail__img").src = song_detail.image_path
                document.getElementById("music_detail__title").textContent = song_detail.judul
                document.getElementById("music_bar_detail__title").textContent = song_detail.judul
                document.getElementById("music_detail__singer").textContent = song_detail.penyanyi
                document.getElementById("music_bar_detail__singer").textContent = song_detail.penyanyi

                document.getElementById("music_detail__duration").textContent = minutes + " : " + seconds

                document.getElementById("music_detail__release").textContent = song_detail.tanggal_terbit
                document.getElementById("music_detail__genre").textContent = song_detail.genre
                document.getElementById("music_detail__album").textContent = song_detail.judul_album
                document.getElementById("main-audio").src = song_detail.audio_path
                document.getElementById("music_bar__title").textContent = song_detail.judul
                document.getElementById("music_bar__singer").textContent = song_detail.penyanyi
            } else{
                console.log("error bos!")
            }
        }
    );
    return;
}

setSongDetailPage(new URLSearchParams(window.location.search).get("id"));