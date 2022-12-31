const deleteSong = () => {
    const songId = new URLSearchParams(window.location.search).get("id")
    getAPI(`php/admin/deleteSong.php?song_id=${songId}`,(data) => {
        console.log(data)
        const result = JSON.parse(data);
        if (result.status === "success") {  
            window.location = "sidebar.html"
        } else{
            document.getElementById("edit_song__warning_text").textContent = "Delete Song Error!";
        }
    })
}