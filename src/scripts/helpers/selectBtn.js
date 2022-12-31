const selectBtn = document.querySelector(".genre_btn"),
items = document.querySelectorAll(".list__genre_item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
    });

    let checked = document.querySelectorAll(".checked"),
        btnText = document.querySelector(".genre_btn__text");

        console.log(checked, btnText);
    ;
});

const titleBtn = document.querySelector(".title_btn");
const dateBtn = document.querySelector(".date_btn");

titleBtn.addEventListener("click", () => {
    if (titleBtn.classList.contains("asc")){
        titleBtn.classList.remove("asc");
        titleBtn.classList.add("desc");
    } else if (titleBtn.classList.contains("desc")){
        titleBtn.classList.remove("desc");
    } else{
        titleBtn.classList.add("asc");
        dateBtn.classList.remove("asc");
        dateBtn.classList.remove("desc");
    }
});


dateBtn.addEventListener("click", () => {
    if (dateBtn.classList.contains("asc")){
        dateBtn.classList.remove("asc");
        dateBtn.classList.add("desc");
    } else if (dateBtn.classList.contains("desc")){
        dateBtn.classList.remove("desc");
    } else{
        dateBtn.classList.add("asc");
        titleBtn.classList.remove("asc");
        titleBtn.classList.remove("desc");
    }
});