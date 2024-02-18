const flight1 = document.getElementById("flight1")
const vid1 = document.getElementById("vid1")
button1Hidden = true

flight1.addEventListener("click", () => {
    vid1.classList.toggle("hiddenVideo");
    if (button1Hidden) {
        flight1.textContent = "Hide video";
        button1Hidden = false;
    }
    else {
        flight1.textContent = "Solo flight";
        button1Hidden = true;
    }
  });

const flight2 = document.getElementById("flight2")
const vid2 = document.getElementById("vid2")
button2Hidden = true

flight2.addEventListener("click", () => {
    vid2.classList.toggle("hiddenVideo");
    if (button2Hidden) {
        flight2.textContent = "Hide video";
        button2Hidden = false;
    }
    else {
        flight2.textContent = "Night Flight";
        button2Hidden = true;
    }
});

const flight3 = document.getElementById("flight3")
const vid3 = document.getElementById("vid3")
button3Hidden = true

flight3.addEventListener("click", () => {
    vid3.classList.toggle("hiddenVideo");
    if (button3Hidden) {
        flight3.textContent = "Hide video";
        button3Hidden = false;
    }
    else {
        flight3.textContent = "Helicopter";
        button3Hidden = true;
    }
});

const backToTop = document.getElementById("backtotop")
const scrollingEnd = document.querySelector(".scrolling")

backToTop.addEventListener("click", () => {
    backToTop.classList.toggle("scrolling")
});

backToTop.addEventListener("transitionend", () => {
    if (backToTop.classList.contains("scrolling")) {
        window.scrollTo(0,0);
        backToTop.classList.remove("scrolling")
    }
});