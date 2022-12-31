var loadFile = function(event) {
  var image = document.getElementById('music_detail__img');
  image.src = URL.createObjectURL(event.target.files[0]);
};

const editSongCallback = (data) => {
  console.log(data);
  const result = JSON.parse(data);

  if (result.status == "success"){
      document.getElementById("edit_song__warning_text").textContent = "Song successfully edited!";
      window.location = "sidebar.html"
  } else {
      let desc = result.description;
      if (desc === "DB_ERROR"){
          document.getElementById("edit_song__warning_text").textContent = "Database error";
      } else if (desc === "SONG_NOT_AVAILABLE"){
          document.getElementById("edit_song__warning_text").textContent = "Song already exists";
      } else if (desc === "SONG_SIZE_FAIL"){
          document.getElementById("edit_song__warning_text").textContent = "Song Image Size too large";
      } else if (desc === "SONG_UPLOAD_FAIL"){
          document.getElementById("edit_song__warning_text").textContent = "Song Image Upload failed. Successfully made without image!";
      }
  }
}

const editSongForm = document.getElementById("edit_song")
editSongForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const songId = new URLSearchParams(window.location.search).get("id")
  formData.append("song_id", songId);

  if(formData.get("genre") === "0"){
    formData.set("genre","Pop")
  }

  if(formData.get("album_id") === "0"){
      formData.set("album_id","1")
  }

  // loop params key value from form
  for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
  }
  postAPI("php/admin/editSong.php" , editSongCallback , formData)
})
