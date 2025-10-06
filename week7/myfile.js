const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const event1 = document.querySelector('.event1');
const eventFilter = document.querySelector('.event1');
const eventFilter2 = document.querySelector('.event3');

const btn = document.querySelector('#theme').addEventListener('click', theme);
let filter_changed = false;

const small_txt = document.querySelector('#small-text');
const med_text = document.querySelector('#med-text');
const large_txt = document.querySelector('#large-text');
const clear_txt_pref = document.querySelector('#clear-preferences');
const font_toggle = document.querySelector('#fontToggle');

    function Filter(event) {
        console.log('triggered');
        if (event.key == "f") {
            if (filter_changed == false) {
                eventFilter.style.display = 'block';
                eventFilter2.style.display = 'block';
                filter_changed = true;
            }
            else {
                eventFilter.style.display = 'none';
                eventFilter2.style.display = 'none';
                filter_changed = false;
            }
        }
    }

    addEventListener("keydown", (event) => {Filter(event)});
        
    function showMenu () {
        navMenu.classList.toggle("show");
        navMenu.classList.toggle("hide");

    }

    navToggle.addEventListener('click', showMenu)

    var shown = navMenu.classList.toggle("hide");


    function theme() {
        console.log('theme works');
        const inTheme = document.body.className;
        setTheme(inTheme);

    }

    function setTheme(theme) {
        let inTheme = theme;
        if (inTheme == 'dark') {
            theme = 'light';
        }
        else {
            theme = 'dark';
        }
        localStorage.setItem('userTheme', theme);
        document.body.className = theme;
     }

    window.addEventListener('load', function() {
        const savedTheme = localStorage.getItem('userTheme') || 'light';
        document.body.className = savedTheme;
    });

function change_text_size(size) {
    let temp_size = size * 16;

    document.querySelector('html').style.fontSize = String(temp_size) + "px";
    localStorage.setItem("fontSize", temp_size);
}

function set_text_size() {
    if (localStorage.getItem("fontSize") !== null) {
        let temp_size = localStorage.getItem("fontSize");
        document.querySelector('html').style.fontSize = String(temp_size) + "px";
    }
}


function clear_local_storage(size) {
    let temp_size = size * 16;

    localStorage.clear();
    document.querySelector('html').style.fontSize = String(temp_size) + "px";
}


function toggleFont() {
    const isSerif = document.body.classList.contains('serif-font');

    if (isSerif) {
        document.body.classList.remove('serif-font');
        localStorage.setItem('userFont','sans-serif');
    }
    else {
        document.body.classList.add('serif-font');
        localStorage.setItem('userFont','serif');
    }
}

function applySavedFont () {
    const savedFont = localStorage.getItem('userFont');
    if (savedFont == 'serif') {
        document.body.classList.add('serif-font');
    }
}

font_toggle.addEventListener('click', toggleFont);

window.addEventListener('load', set_text_size);

window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem('userTheme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    set_text_size();

    applySavedFont();
});

small_txt.addEventListener('click', () => {change_text_size(0.8)});
med_text.addEventListener('click', () => {change_text_size(1)});
large_txt.addEventListener('click', () => {change_text_size(1.5)});
clear_txt_pref.addEventListener('click', () => {change_text_size(1)});