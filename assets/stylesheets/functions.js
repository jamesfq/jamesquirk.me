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
const topButton = document.getElementById("topButton")

// if it is clicked, start expanding
topButton.addEventListener("click", () => {
    topButton.classList.toggle("expanding")
});

// once the button is at full size, make the transition instantly 
topButton.addEventListener("transitionend", () => {
    // This if statement means that we will not scroll back to the top if the transition that just ended was the minimizing of the button again
    if (topButton.classList.contains("expanding")) {
        // If expanding happened, scroll to top and remove expanding to make button shrink again
        window.scroll({top: 0, behavior: 'instant'});
        topButton.classList.remove("expanding")
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

