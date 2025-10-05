let settingIcon = document.querySelector(".settingIcon");
let landingPage = document.querySelector(".landingPage");
let settingBox = document.querySelector(".settingBox");
let backgroundsButton = document.querySelector(".backgroundsButton");
let backgroundsSpan = document.querySelector(".backgroundsSpan");
let colorsList = document.querySelectorAll(".colorsList li");
let allSkills = document.querySelectorAll(".skillsBox .skillProgress span");
let ourGallery = document.querySelectorAll(".gallery img");
let allBulletys = document.querySelectorAll(".bullet");
let alllinks = document.querySelectorAll(".links a");
let skills = document.querySelector(".skills");
let navBullets = document.querySelector(".navBullets");
let bulletsSpan = document.querySelectorAll(".bulletsOption span");
let colorPage = localStorage.getItem("colorPage");
let randomLocal = localStorage.getItem("randombackgrounds");
let bulletLocal = localStorage.getItem("bulletsOption");
let toggleMenu = document.querySelector(".toggleMenu");
let links = document.querySelector(".links");
let IntervalBackgrounds;

if (randomLocal != null) {
  if (randomLocal == "true") {
    randomBackgrounds(true);
  } else {
    randomBackgrounds(false);
  }
}

function randomBackgrounds(randomImg) {
  if (randomImg === true) {
    localStorage.setItem("randombackgrounds", true);
    backgroundsSpan.innerHTML = "ON";
    backgroundsSpan.classList.add("on");
    IntervalBackgrounds = setInterval(() => {
      randomImg = Math.floor(Math.random() * 4 + 1);
      landingPage.style.backgroundImage = `url("../IMG/0${randomImg}.jpg")`;
    }, 5000);
  } else {
    clearInterval(IntervalBackgrounds);
    localStorage.setItem("randombackgrounds", false);
    backgroundsSpan.innerHTML = "OFF";
    backgroundsSpan.classList.remove("on");
  }
}

backgroundsButton.addEventListener("click", () => {
  backgroundsSpan.classList.toggle("on");
  if (backgroundsSpan.classList.contains("on")) {
    randomBackgrounds(true);
  } else {
    randomBackgrounds(false);
  }
});

if (colorPage !== null) {
  document.documentElement.style.setProperty("--mainColor", colorPage);
  colorsList.forEach((element) => {
    if (element.dataset.color == colorPage) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

colorsList.forEach((color) => {
  color.addEventListener("click", (element) => {
    document.documentElement.style.setProperty(
      "--mainColor",
      element.target.dataset.color
    );
    localStorage.setItem("colorPage", element.target.dataset.color);
    [...element.target.parentElement.children].forEach((element) => {
      element.classList.remove("active");
    });
    element.target.classList.add("active");
  });
});

settingIcon.addEventListener("click", () => {
  settingBox.classList.toggle("open");
  settingIcon.classList.toggle("fa-spin");
});

window.onscroll = function () {
  let skillOffSetTop = skills.offsetTop;
  let skillOuterHight = skills.offsetHeight;
  let windowHeight = window.innerHeight;
  let windowScrollTop = window.pageYOffset;
  let offset = skillOffSetTop + skillOuterHight - windowHeight;
  if (windowScrollTop > offset) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let titleImg = document.createElement("div");
    let exitImg = document.createElement("div");
    let overlay = document.createElement("div");
    let pouppBox = document.createElement("div");
    let pouppImg = document.createElement("img");

    if (img.alt !== null) {
      let titleImg = document.createElement("div");
      titleImg.className = "titleImg";
      titleImg.innerHTML = img.alt;
      pouppBox.appendChild(titleImg);
    }
    exitImg.className = "exitImg";
    overlay.className = "popupOverlay";
    pouppBox.className = "pouppBox";
    pouppImg.className = "pouppImg";

    exitImg.innerHTML = "X";
    pouppImg.src = img.src;

    pouppBox.appendChild(exitImg);
    pouppBox.appendChild(pouppImg);
    document.body.appendChild(pouppBox);
    document.body.appendChild(overlay);
  });
});
document.addEventListener("click", (ele) => {
  if (ele.target.classList == "exitImg") {
    document.querySelector(".popupOverlay").remove();
    document.querySelector(".pouppBox").remove();
  }
});
function scrollTo(arrele) {
  arrele.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
if (bulletLocal !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocal == "block") {
    navBullets.style.display = "block";
    document.querySelector(".bulletsOption .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bulletsOption .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display == "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bulletsOption", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bulletsOption", "none");
    }
    handelActive(e);
  });
});

function handelActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}
document.querySelector(".resetOptions").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
links.onclick = function (e) {
  e.stopPropagation();
};
toggleMenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menuActive");
  links.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target != toggleMenu && e.target != links) {
    if (links.classList.contains("open")) {
      toggleMenu.classList.toggle("menuActive");
      links.classList.toggle("open");
    }
  }
});
