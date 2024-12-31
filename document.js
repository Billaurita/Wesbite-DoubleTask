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

const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July", 
               "August", "September", "October", "November", "December"];
// Getting localstorage notes if exits and parsing them
// to js object else passing an empty array to nates
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
addBox.addEventListener("click", () => {
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
       let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class='bx bx-dots-horizontal-rounded'></i>
                                <ul class="menu">
                                    <li onlick="updateNote(${index}, '${note.title}', '${note.description}')"><i class='bx bx-edit'></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class='bx bx-trash'></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        // Remove show class from the settings menu on document click
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1); // remove selected note from array/taks
    // Save update note to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    console.log(noteId, title, desc);
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        // Getting month, day, year from the current date
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo ={
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        notes.push(noteInfo); // adding new note to notes
        // Save notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add("hide");
    }
})

if(window.innerWidth < 768){
    sideBar.classList.add("hide");
};