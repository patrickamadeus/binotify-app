var loadFile = function(event) {
    var image = document.getElementById('album_detail__img');
    image.src = URL.createObjectURL(event.target.files[0]);
};

var loadFile2 = function(event) {
    var image = document.getElementById('music_detail__img');
    image.src = URL.createObjectURL(event.target.files[0]);
};

const redirectAlbumAdmin = () => {
    // get current window location
    const currentLocation = window.location.search;
    const urlRedirect = "/detail_album_admin.html" + currentLocation;
    window.location = urlRedirect;
}

const redirectSongAdmin = () => {
    // get current window location
    const currentLocation = window.location.search;
    const urlRedirect = "/detail_admin.html" + currentLocation;
    window.location = urlRedirect;
}