const addSongCallback = (data) => {
    console.log(data);
    const result = JSON.parse(data);

    if (result.status == "success"){
        console.log("berhasil menaambahkan lagu");
        window.location ="sidebar.html";
    } else {
        console.log("gagal menambahkan lagu");
    }

}

// const addSong = (judul, penyanyi, tanggal_terbit, genre, duration, audio_path, image_path, album_id) => {
//     getAPI(`php/admin/addSong.php?judul=${judul}&penyanyi=${penyanyi}&tanggal_terbit=${tanggal_terbit}&genre=${genre}&duration=${duration}&audio_path=${audio_path}&image_path=${image_path}&album_id=${album_id}`, addSongCallback);

//     return;
// }


function getDuration(src, cb) {
    var audio = new Audio();
    audio.onloadedmetadata = function(){
        cb(audio.duration);
    };
    audio.src = src;
}

const button = document.getElementById("addSongSubmitButton");

button.addEventListener("click", (e) => {
  const form = document.getElementById('addSongForm');
  const formData = new FormData(form);

  if(formData.get("songgenre") === "0"){
    formData.set("songgenre","Pop")
  }

  if(formData.get("album_id") === "0"){
      formData.set("album_id","1")
  }

    console.log("masuk")
let duration = parseInt(document.getElementById("songmp3duration").textContent);
  console.log(duration)

  formData.append("duration", duration);

  // loop key and value form data
for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
}

  postAPI('php/admin/addSong.php' , addSongCallback, formData)
//   addSong(formData['songtitle'],formData['songsinger'],formData['songdate'],formData['songgenre'], formData['duration'], formData['songmp3file'], formData['songimgfile'], formData['songalbum']);
})


async function getDuration(file) {
    const url = URL.createObjectURL(file);
   
    return new Promise((resolve) => {
      const audio = document.createElement("audio");
      audio.muted = true;
      const source = document.createElement("source");
      source.src = url; //--> blob URL
      audio.preload= "metadata";
      audio.appendChild(source);
      audio.onloadedmetadata = function(){
         resolve(audio.duration)
         document.getElementById("songmp3duration").textContent = parseInt(audio.duration) + " Seconds";
      };
    });
}

const uploadSong = async (event) => {
    let file = event.target.files[0];
    const duration = await getDuration(file);
};
