const getListofSongs = (limit, all) => {
    getAPI("php/song/getLatestSongs.php", (data) => {
      const jsonData = JSON.parse(data);
      generateSongsDashboard(jsonData.payload, limit, all);
      document.getElementById("header__title").textContent = "Latest Songs"
    });
  };

// get param page from url 
const urlParams = new URLSearchParams(window.location.search).get("page");
if (urlParams === null){
  getListofSongs(10, false);
} else{
  document.getElementById("header__title").textContent = "Loading...";
  document.getElementById("pagination_page").textContent = "";
}

  