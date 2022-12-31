const getAlbumsbyPagination = (query) =>{
    getAPI(`php/album/getAlbums.php?query=${query}`, 
        (data) => {
            const result = JSON.parse(data);
            if (result.status === "success") {
                if (result.description === "ALBUMS_FOUND") {
                    generateAlbumsDashboard(result.payload, 8, true);
                    
                    // TODO : Boldin angka yang lagi di page itu
                }
            } else{
                document.getElementById("dashboard__itemcontainer").innerHTML = `<h1>Internal Error. Please contact our Developer</h1>`;
            }
      }
  );
  return;
}

pagination_query_param = new URLSearchParams(window.location.search).get("query")

if (!pagination_query_param){
    pagination_query_param = "";
}

getAlbumsbyPagination(pagination_query_param);


