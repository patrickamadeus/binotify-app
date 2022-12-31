const filterInput = document.getElementById("album_filter__input")

filterInput.addEventListener("input", (e) => {
    e.preventDefault()
    getAlbumsbyPagination(e.target.value)
})


