// Make the first flight video show up when the button is clicked for the first time
// then disappear when it's clicked again
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

// Same process as flight1
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

// Same process as flight1
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

// A fun animation when the "back to top" button is clicked!
const backToTop = document.getElementById("backtotop")
const scrollingEnd = document.querySelector(".scrolling")

// if it is clicked, start expanding
backToTop.addEventListener("click", () => {
    backToTop.classList.toggle("expanding")
});

// once the button is at full size, make the transition instantly 
backToTop.addEventListener("transitionend", () => {
    // This if statement means that we will not scroll back to the top if the transition that just ended was the minimizing of the button again
    if (backToTop.classList.contains("expanding")) {
        // If expanding happened, scroll to top and remove expanding to make button shrink again
        window.scroll({top: 0, behavior: 'instant'});
        backToTop.classList.remove("expanding")
    }
});

// commands to forward the user to certain links depending on words they click
const research = document.getElementById("research")
const allStar = document.getElementById("allStar")
const engs23 = document.getElementById("engs23")
const uvcif = document.getElementById("uvcif")
const github = document.getElementById("github")
const linkedin = document.getElementById("linkedin")
const instagram = document.getElementById("instagram")

// if click happens, open link
research.addEventListener("click", () => {
    window.open("https://engineering.dartmouth.edu/news/dartmouth-interns-gain-research-experience-at-erdcs-cold-regions-research-and-engineering-laboratory", '_blank');
});

allStar.addEventListener("click", () => {
    window.open("https://arktimes.com/news/cover-stories/2021/05/10/the-2021-arkansas-times-academic-all-star-team", '_blank');
});

engs23.addEventListener("click", () => {
    window.open("https://engineering.dartmouth.edu/courses/engs23", '_blank');
});

uvcif.addEventListener("click", () => {
    window.open("https://students.dartmouth.edu/social-impact/programs-initiatives/students/social-sector-career-programs/82-upper-valley-community-impact", '_blank');
});

github.addEventListener("click", () => {
    window.open("https://github.com/jamesfq", '_blank');
});

linkedin.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/james-quirk-509486237/", '_blank');
});

instagram.addEventListener("click", () => {
    window.open("https://www.instagram.com/jfquirk?igsh=OGQ5ZDc2ODk2ZA==", '_blank');
});



// INTERSECTION OBSERVER API //
// Following this tutorial: https://www.youtube.com/watch?v=1vR3m0HupGI&list=LL&index=1&t=693s
// We are looking at all flexboxes. They will slide into view if they enter the screen.
let targets = document.querySelectorAll('.container');

// This is a basic setup that is defined in this documentation: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const options = {
    root: null, // Reference entire webpage
    rootMargin: "0px",
    threshold: 0.1, // 10% of the target element must be visible
};

// The callback causes the system to change if an intersection is detected
let callback = (entries) => {
    entries.forEach((entry) => { // for every flexbox
        if (entry.isIntersecting) { // if it comes into view
            entry.target.classList.add('scrollIn'); // turn on scrollIn class to make come into screen
        }

        else {
            entry.target.classList.remove('scrollIn'); // if scrolled away, make it subside again
        }
    });
}

// observer is defined by the callback and options
let observer = new IntersectionObserver(callback, options);

// For every item in the targets we've defined
targets.forEach((target) => {
    observer.observe(target); // watch at all times
});



// SPOTIFY API //
// Documentation here: https://developer.spotify.com
// This tutorial followed: https://www.youtube.com/watch?v=1vR3m0HupGI&list=LL&index=1&t=693s

// When leaving site to login, this is where we come back to
var redirect_uri = "https://jamesfq.github.io/jamesquirk.me/"

// On developer mode, only 25 users can access the webpage, and they must be on an access list
// Everyone should login via the client ID and client secret provided in the API
var client_id = "";
var client_secret = "";

// Base of the URL where the user is sent to authorize
const AUTHORIZE = "https://accounts.spotify.com/authorize"

// Base of the URL where we get access and refresh tokens
const TOKEN = "https://accounts.spotify.com/api/token";

// List of top 10 artists in the last 4 weeks
const ARTISTS = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10"

// When the page loads up
function onPageLoad() {
    // Gather the ID, secret, and tokens as they should have been stored in local storage
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    access_token = localStorage.getItem("access_token");
    refresh_token = localStorage.getItem("refresh_token");
    
    // If searching, begin authorization
    if (window.location.search.length > 0) {
        handleRedirect();
    }
}

// On redirect, we must store the code placed in the URL for us to parse
function handleRedirect() {
    // Gather code from URL
    let code = getCode();

    // Call the authorization on the parsed portion of the URL
    fetchAccessToken(code);

    // Changes the URL back to the base URL
    window.history.pushState("", "", redirect_uri);
}

// supplement to above function: saves the information put in the URL by the authorization call
function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
    }

    return code;
}

// Add all necessary details to the API call
function fetchAccessToken(code) {
    // All information provided above
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

// Continuation of finding our access and refresh token as started in fetchAccessToken
function callAuthorizationApi (body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

// Finish the process of finding the access and refresh tokens
function handleAuthorizationResponse() {
    if (this.status == 200) { // 200 is the Spotify code for success as seen in documentation
        var data = JSON.parse(this.responseText); // data represents the information from our API call
        console.log(data);
        var data = JSON.parse(this.responseText); // call again after logging
        if (data.access_token != undefined) { // if our access token exists, save it
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token); // store in memory
        }

        if (data.refresh_token != undefined) { // same for refresh token as access token
            refresh_token = data.refresh_token
            localStorage.setItem("refresh_token", refresh_token);
        }
        
        // tokens are gathered, run onPageLoad again
        onPageLoad();
    }

    else { // if a failure, save the failure message
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// This is how we authorize
function requestAuthorization() {
    // User inputs client ID and secret, save them to local memory
    client_id = document.getElementById("client_id").value;
    client_secret = document.getElementById("client_secret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    // add all details to authorize call so that the user is redirected to the right page
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=playlist-read-private playlist-read-collaborative user-read-playback-state user-top-read";
    window.location.href = url;

}

// When the user clicks the button, we request all top artists to be updated
function refreshArtists() {
    callApi("GET", ARTISTS, null, handleArtistsResponse)

}

// When the API calls for the information on top artists, if we get a successful call, we continue
function handleArtistsResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText); // saves the artists in raw data
        console.log(data);
        removeAllItems("artists"); // resets items currently in the dropdown box

        // adds a default "select artist" item
        let node = document.createElement("option");
        node.value = "Select Artist";
        node.innerHTML = "Select Artist";
        document.getElementById("artists").appendChild(node)

        // For every artist, add them to the dropdown box
        data.items.forEach(item => addArtist(item));
        document.getElementById("artists").addEventListener("change", function () {
            inputArtist(data.items[this.selectedIndex - 1]); // pass artist 1 above current index (bc of "Select Artist") to be shown
        });
    }

    // if failure because of expired token, refresh token
    else if (this.status == 401) {
       refreshAccessToken()
    }

    // other error, save to console
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

// Refreshes token if expired
function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token"); // saved in local memory
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body); // repeat the API authorization call
}

// Allows for any type of communication with API
function callApi (method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

// Adds an artist to the dropdown box
function addArtist(item) {
    let node = document.createElement("option"); // create an element
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("artists").appendChild(node) // add it to the dropdown
}

// Resets dropdown
function removeAllItems(elementId) {
    let node = document.getElementById(elementId)
    while (node.firstChild) { // while there is an element in the dropdown
        node.removeChild(node.firstChild) // keep removing them
    }
}

// User's way of displaying an artist at the bottom of the screen
sampleArtist = document.getElementById("sampleArtist")

function inputArtist(item) {
    if (item.id != "Select Artist") { // as long as we're not on "Select Artist"
        sampleArtist.src = `https://open.spotify.com/embed/artist/${item.id}`; // update the shown artist to current one
        sampleArtist.height = 352; // and set height as it was 0 at the beginning
    }
 }