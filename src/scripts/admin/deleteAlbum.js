const deleteAlbum = () => {
    const albumId = new URLSearchParams(window.location.search).get("id")
    getAPI(`php/admin/deleteAlbum.php?album_id=${albumId}`,(data) => {
        const result = JSON.parse(data);
        if (result.status === "success") {  
            window.location = "album.html"
        } else{
            document.getElementById("edit_album__warning_text").textContent = "Delete Album Error!";
        }
    })
}