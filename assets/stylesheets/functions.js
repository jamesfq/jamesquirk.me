sampleArtist = document.getElementById("sampleArtist")

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
        window.scroll({top: 0, behavior: 'instant'});
        backToTop.classList.remove("scrolling")
    }
});

const research = document.getElementById("research")

research.addEventListener("click", () => {
    window.open("https://engineering.dartmouth.edu/news/dartmouth-interns-gain-research-experience-at-erdcs-cold-regions-research-and-engineering-laboratory", '_blank');
});

const allStar = document.getElementById("allStar")

allStar.addEventListener("click", () => {
    window.open("https://arktimes.com/news/cover-stories/2021/05/10/the-2021-arkansas-times-academic-all-star-team", '_blank');
});

const engs23 = document.getElementById("engs23")

engs23.addEventListener("click", () => {
    window.open("https://engineering.dartmouth.edu/courses/engs23", '_blank');
});

const uvcif = document.getElementById("uvcif")

uvcif.addEventListener("click", () => {
    window.open("https://students.dartmouth.edu/social-impact/programs-initiatives/students/social-sector-career-programs/82-upper-valley-community-impact", '_blank');
});

const github = document.getElementById("github")

github.addEventListener("click", () => {
    window.open("https://github.com/jamesfq", '_blank');
});

const linkedin = document.getElementById("linkedin")

linkedin.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/james-quirk-509486237/", '_blank');
});

const instagram = document.getElementById("instagram")

instagram.addEventListener("click", () => {
    window.open("https://www.instagram.com/jfquirk?igsh=OGQ5ZDc2ODk2ZA==", '_blank');
});


let targets = document.querySelectorAll('.container');

const options = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of the target element must be visible
};

let callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scrollIn');
        }

        else {
            entry.target.classList.remove('scrollIn');
        }
    });
}

let observer = new IntersectionObserver(callback, options);

targets.forEach((target) => {
    observer.observe(target);
});

const thisTest = document.getElementById("thisTest")
const artist = document.getElementById("thisRes")

// following tutorial: https://www.youtube.com/watch?v=1vR3m0HupGI&list=LL&index=1&t=693s

var redirect_uri = "http://127.0.0.1:3000/index.html"

var client_id = "";
var client_secret = "";

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const ARTISTS = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10"

function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    access_token = localStorage.getItem("access_token");
    refresh_token = localStorage.getItem("refresh_token");
    if (window.location.search.length > 0) {
        handleRedirect();
    }
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri);
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi (body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }

        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token
            localStorage.setItem("refresh_token", refresh_token);
        }

        onPageLoad();
    }

    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
    }

    return code;
}

function requestAuthorization() {
    client_id = document.getElementById("client_id").value;
    client_secret = document.getElementById("client_secret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-read-private playlist-read-collaborative user-read-playback-state user-top-read";
    window.location.href = url;

}

function refreshArtists() {
    callApi("GET", ARTISTS, null, handleArtistsResponse)

}

function handleArtistsResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems("artists");

        let node = document.createElement("option");
        node.value = "Select Artist";
        node.innerHTML = "Select Artist";
        document.getElementById("artists").appendChild(node)

        data.items.forEach(item => addArtist(item));
        document.getElementById("artists").addEventListener("change", function () {
            inputArtist(data.items[this.selectedIndex - 1]);
        });
    }

    else if (this.status == 401) {
       refreshAccessToken()
    }

    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callApi (method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

function addArtist(item) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("artists").appendChild(node)
}

function removeAllItems(elementId) {
    let node = document.getElementById(elementId)
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
}

function inputArtist(item) {
    if (item.id != "Select Artist") {
        sampleArtist.src = `https://open.spotify.com/embed/artist/${item.id}`;
        sampleArtist.height = 352;
    }
 }