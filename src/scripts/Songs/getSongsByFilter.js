const getSongsByFilter = (judul,genre,sortjudul,sortdate) => {
    getAPI(`php/song/getSongByFilter.php?judul=${judul}&genre=${genre}&sortjudul=${sortjudul}&sortdate=${sortdate}`, 
        (data) => {
            // console.log(data)
            const result = JSON.parse(data);
            if (result.status === "success") {
                if (result.description === "SONG_FOUND") {
                    generateSongsDashboard(result.payload, 10, true);
                    document.getElementById("pagination_link__container").innerHTML = result.page_link;
                    document.getElementById("header__title").textContent = "Search Result"
                } else if (result.description === "SONG_NOT_FOUND"){
                    document.getElementById("dashboard__itemcontainer").innerHTML = `<h1 class = "home_warning__text">No Song Found</h1>`;
                    document.getElementById("header__title").textContent = "Search Result"
                    document.getElementById("pagination_link__container").innerHTML = "";
                } else if (result.description === "EMPTY_QUERY"){
                    getListofSongs(10, false);
                    document.getElementById("pagination_link__container").innerHTML = "";
                    // document.getElementById("header__title").textContent = "Latest Songs"
                }
            } else{
                document.getElementById("dashboard__itemcontainer").innerHTML = `<h1 class = "home_warning__text">Internal Error. Please contact our Developer</h1>`;
                document.getElementById("header__title").textContent = "Search Result"
            }
        }
    );
    return;
}

const getSongsByPagination = (page, judul, genre,sortjudul,sortdate) =>{
    getAPI(`php/song/getSongPagination.php?page=${page}&judul=${judul}&genre=${genre}&sortjudul=${sortjudul}&sortdate=${sortdate}`, 
        (data) => {
            // console.log(data);
            const result = JSON.parse(data);
            console.log(result.query)
            console.log("INI",result.page_link)
            if (result.status === "success") {
                if (result.description === "SONG_FOUND") {
                    generateSongsDashboard(result.payload, 10, true, page);
                    document.getElementById("pagination_link__container").innerHTML = result.page_link;
                    document.getElementById("header__title").textContent = "Search Result"
                }
            } else{
                document.getElementById("dashboard__itemcontainer").innerHTML = `<h1>Internal Error. Please contact our Developer</h1>`;
            }
        }
    );
    return;
}

const inputFilterListenerFunction = (e) => {
    e.preventDefault()

    const titleQuery = document.getElementById("song_filter__input").value
    const chosenGenre = document.querySelectorAll('.list__genre_item.checked')
    const titleSortedAsc = document.querySelectorAll(".title_btn.asc").length
    const titleSortedDesc = document.querySelectorAll(".title_btn.desc").length
    const dateSortedAsc = document.querySelectorAll(".date_btn.asc").length
    const dateSortedDesc = document.querySelectorAll(".date_btn.desc").length
    
    let chosenGenreQuery = ""
    for (let i = 0; i < chosenGenre.length; i++) {
        chosenGenreQuery = chosenGenreQuery + chosenGenre[i].getAttribute("value") + ((i < chosenGenre.length - 1) ? ';' : '')
    }

    let sortjudul = 0
    if(titleSortedAsc){
        sortjudul = 1
    } else if (titleSortedDesc){
        sortjudul = -1
    }

    let sortdate = 0
    if(dateSortedAsc){
        sortdate = 1
    } else if (dateSortedDesc){
        sortdate = -1
    }

    console.log("Title Query : ", titleQuery)
    console.log("Genre Query : ", chosenGenreQuery)
    console.log("Sort Judul : ", sortjudul)
    console.log("Sort Date : ", sortdate)

    getSongsByFilter(titleQuery,chosenGenreQuery, sortjudul, sortdate)
}

Array.from(document.getElementsByClassName("title_btn"))
    .forEach((element) => {
        element.addEventListener("click", inputFilterListenerFunction);
    }
)

Array.from(document.getElementsByClassName("date_btn"))
    .forEach((element) => {
        element.addEventListener("click", inputFilterListenerFunction);
    }
)

Array.from(document.getElementsByClassName("list__genre_item"))
    .forEach((element) => {
        element.addEventListener("click", inputFilterListenerFunction);
    }
)

document.getElementById("song_filter__input")
    .addEventListener("input", inputFilterListenerFunction);

const page_param = new URLSearchParams(window.location.search).get("page")
const query_param = new URLSearchParams(window.location.search).get("judul")
const genre_param = new URLSearchParams(window.location.search).get("genre")
const sortjudul_param = new URLSearchParams(window.location.search).get("sortjudul")
const sortdate_param = new URLSearchParams(window.location.search).get("sortdate")

console.log("Page Param :",page_param)
console.log("Query Param :",query_param)
console.log("Genre Param :",genre_param)
console.log("Sort Judul Param :",sortjudul_param)
console.log("Sort Date Param :",sortdate_param)

if (page_param !== null && query_param !== null && genre_param !== null && sortjudul_param !== null && sortdate_param !== null){
    console.log("MASOK")
    getSongsByPagination(page_param, query_param, genre_param, sortjudul_param, sortdate_param)
    document.getElementById("pagination_page").textContent = "Page " + page_param
}


