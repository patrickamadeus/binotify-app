const generateListAlbum = () => {
    getAPI(`php/admin/generateListAlbum.php` , (data) => {
        console.log(data);
        const result = JSON.parse(data);

        if (result.status === "success") {
            if (result.description === "LIST_ALBUM_GENERATED") {
                console.log(result.list_album);
                console.log("berhasil melist album");
                
                document.getElementById("album_option__container").innerHTML = result.list_album;

            }
        } else{
            console.log("gagal melist album");
        }
    }
    )
}
generateListAlbum();