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

// imageContainers.forEach((imageContainer) => {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('scrollIn');
//             }

//             else {
//                 entry.target.classList.remove('scrollIn');
//             }
//         });
//     }, options);

//     observer.observe(imageContainer);
// });