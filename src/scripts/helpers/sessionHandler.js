const adminLocs = [
    '/add_album.html',
    '/add_song.html',
    '/detail_user.html',
    '/admin.html',
    '/detail_admin.html',
    '/detail_album_admin.html'
]

const checkLoginCallback = (data) => {
    console.log(data);
    var currentLocation = window.location.pathname;
    const result = JSON.parse(data);
    if (!result.hasOwnProperty("status") || result["status"] !== "success") {
        console.log("no session yet");
        console.log(currentLocation);
        if (currentLocation != '/login.html'){
            window.location = 'login.html';
        }
    }else if(!result.hasOwnProperty("status") || result["isGuess"] == true){
        console.log("this is guess");
        document.getElementById("username_holder").textContent = "Guest";
        
        if (currentLocation === '/login.html'){
            window.location = 'sidebar.html';
        }

        console.log(currentLocation)

        if (adminLocs.includes(currentLocation)){
            window.location = 'sidebar.html';
        }        

        document.getElementById("add_song__button").style.display = "none";
        document.getElementById("add_album__button").style.display = "none";
        document.getElementById("detail_user__button").style.display = "none";
        document.getElementById("premium_song__button").style.display = "none";

        var editSongButtons = document.getElementById("editSongButton")
        var editAlbumButtons = document.getElementById("editAlbumButton")
        if (!editSongButtons){
            editSongButtons.style.display = "none";
        }
        if (!editAlbumButtons){
            editAlbumButtons.status.display = "none";
        }

        // if (currentLocation != '/sidebar.html'){
        //     window.location = 'sidebar.html';
        // }
    }else{
        document.getElementById("username_holder").textContent = result['username'];
        verifyAdmin();
    }

}
  
const checkLogin = () => {
    getAPI('php/verifysession.php', checkLoginCallback);
}

const checkAdminCallback = (data) => {
    console.log(data);
    var currentLocation = window.location.pathname;

    const result = JSON.parse(data);
    if (result.hasOwnProperty("status") && result["status"] === "success") {
        console.log("this is admin");
        if (currentLocation === '/login.html'){
            window.location = 'sidebar.html';
        }
        document.getElementById("add_song__button").style.display = "inline-block";
        document.getElementById("add_album__button").style.display = "inline-block";
        document.getElementById("detail_user__button").style.display = "inline-block";

        var editSongButtons = document.getElementById("editSongButton")
        var editAlbumButtons = document.getElementById("editAlbumButton")
        if (!editSongButtons){
            editSongButtons.style.display = "inline-block";
        }
        if (!editAlbumButtons){
            editAlbumButtons.status.display = "inline-block";
        }

        
        // }
    }else{
        console.log("this is user");
        if (currentLocation === '/login.html'){
            window.location = 'sidebar.html';
        }
        document.getElementById("add_song__button").style.display = "none";
        document.getElementById("add_album__button").style.display = "none";
        document.getElementById("detail_user__button").style.display = "none";
        document.getElementById("editSongButton").style.display = "none";
        document.getElementById("editAlbumButton").style.display = "none";

        if (adminLocs.includes(currentLocation)){
            window.location = 'sidebar.html';
        }
        

    }
}

const verifyAdmin = () => {
    getAPI('php/auth/verifyadmin.php', checkAdminCallback)
}

checkLogin()