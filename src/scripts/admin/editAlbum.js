var loadFile = function(event) {
    var image = document.getElementById('album_detail__img');
    image.src = URL.createObjectURL(event.target.files[0]);
};

const editAlbumCallback = (data) => {
    console.log(data);
    const result = JSON.parse(data);

    if (result.status == "success"){
        document.getElementById("edit_album__warning_text").textContent = "Album successfully edited!";
        window.location = "album.html"
    } else {
        let desc = result.description;
        if (desc === "DB_ERROR"){
            document.getElementById("edit_album__warning_text").textContent = "Database error";
        } else if (desc === "ALBUM_NOT_AVAILABLE"){
            document.getElementById("edit_album__warning_text").textContent = "Album already exists";
        } else if (desc === "ALBUM_SIZE_FAIL"){
            document.getElementById("edit_album__warning_text").textContent = "Album Image Size too large";
        } else if (desc === "ALBUM_UPLOAD_FAIL"){
            document.getElementById("edit_album__warning_text").textContent = "Album Image Upload failed. Successfully made without image!";
        }
    }
}

const editAlbumForm = document.getElementById("edit_album")
editAlbumForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const albumId = new URLSearchParams(window.location.search).get("id")
    formData.append("album_id", albumId);

    // loop params key value from form
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    postAPI("php/admin/editAlbum.php" , editAlbumCallback , formData)
})
