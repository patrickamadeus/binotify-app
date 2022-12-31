const addAlbumCallback = (data) => {
    console.log(data);
    const result = JSON.parse(data);

    if (result.status == "success"){
        document.getElementById("add_album__warning_text").textContent = "Album successfully made!";
        window.location ="album.html";
    } else {
        let desc = result.description;
        if (desc === "DB_ERROR"){
            document.getElementById("add_album__warning_text").textContent = "Database error";
        } else if (desc === "ALBUM_NOT_AVAILABLE"){
            document.getElementById("add_album__warning_text").textContent = "Album already exists";
        } else if (desc === "ALBUM_SIZE_FAIL"){
            document.getElementById("add_album__warning_text").textContent = "Album Image Size too large";
        } else if (desc === "ALBUM_UPLOAD_FAIL"){
            document.getElementById("add_album__warning_text").textContent = "Album Image Upload failed. Successfully made without image!";
        }
    }
}

const addAlbumForm = document.getElementById("addAlbumForm");

addAlbumForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    let formData  = new FormData(e.target);    
    postAPI("php/admin/addAlbum.php", addAlbumCallback, formData);
}    
)