let sideMenu = document.querySelectorAll(".nav-link");
sideMenu.forEach(item => {
    let li = item.parentElement;

    item.addEventListener("click", () => {

        sideMenu.forEach(link => {
            link.parentElement.classList.remove("active");
        });
        li.classList.add("active");
    });
});

let menuBar = document.querySelector(".bx-menu");
let sideBar = document.querySelector(".sidebar");
menuBar.addEventListener("click", () => {
    sideBar.classList.toggle("hide");
});

let switchMode = document.getElementById("switch-mode");
switchMode.addEventListener("change", (e) => {
    if(e.target.checked){
        document.body.classList.add("dark");
    }else{
        document.body.classList.remove("dark");
    }
});

let searchForm = document.querySelector(".content nav form");
let searchBtn = document.querySelector(".search-btn");
let searchIcon = document.querySelector(".bx-search");
searchIcon.addEventListener("click", (e) => {
    if(window.innerWidth < 576){
        e.preventDefault();
        searchForm.classList.toggle("show");
        if(searchForm.classList.contains("show")){
            searchIcon.classList.replace("bx-search", "bx-x");
        }else{
            searchIcon.classList.replace("bx-x", "bx-search");
        }
    }
});

window.addEventListener("resize", () => {

        if(window.innerWidth > 576){
          searchIcon.classList.replace("bx-x", "bx-search");
          searchForm.classList.remove("show");
        }
    if(window.innerWidth < 768){
        sideBar.classList.add("hide");
    }
});

if(window.innerWidth < 768){
    sideBar.classList.add("hide");
};