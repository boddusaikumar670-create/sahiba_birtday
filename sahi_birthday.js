/* PAGE NAVIGATION */
function showPage(pageNumber) {
  // Stop all audio first
  document.querySelectorAll("audio").forEach(aud => aud.pause());

  // Hide all pages
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  // Show requested page
  const page = document.querySelector(".page" + pageNumber);
  page.classList.add("active");

  // Autoplay music for specific pages
  if(pageNumber === 1){
    const music1 = document.getElementById("globalMusic");
    if(music1) music1.play().catch(()=>{});
  } 
  else if(pageNumber === 4){
    const music4 = document.getElementById("bg-music-4");
    if(music4) music4.play();
    startPage4Slideshow(); // ✅ START SLIDESHOW WHEN PAGE 4 OPENS
  }
}

/* PAGE 1 MUSIC AUTOPLAY FIX */
window.addEventListener("DOMContentLoaded", () => {
  const music1 = document.getElementById("globalMusic");
  if (music1) {
    music1.play().catch(() => {
      // Autoplay failed (browser requires user interaction)
      console.log("Autoplay blocked, music will start on first click");
      window.addEventListener("click", () => {
        music1.play();
      }, { once: true });
    });
  }
});

/* PAGE 2 FLIPBOOK */
function openFlipbook() {
  var music = document.getElementById("bg-music-2");

  music.play().then(() => {
    setTimeout(function () {
      window.open("https://heyzine.com/flip-book/55019d0b28.html", "_blank");
    }, 500);
  }).catch(() => {
    window.open("https://heyzine.com/flip-book/55019d0b28.html", "_blank");
  });
}

/* PAGE 3 LOGIC */
/* ================= PAGE 3 INTENTIONS ================= */

// ================= PAGE 3 LOGIC =================
/* ================= PAGE 3 LOGIC ================= */

/* ================= PAGE 3 LOGIC ================= */
/* ================= PAGE 3 COMPLETE FIXED LOGIC ================= */

const cards3 = document.querySelectorAll(".page3 .intentions-card");
const overlay3 = document.getElementById("musicOverlay3");
const music3 = document.getElementById("bg-music-3");
const nextBtn3 = document.getElementById("page3Next");

let current3 = 0;

const directions = ["right","left","top","bottom"];

const colors = [
  "linear-gradient(45deg,#1e1e2f,#3a1c71)",
  "linear-gradient(45deg,#42275a,#734b6d)",
  "linear-gradient(45deg,#141e30,#243b55)",
  "linear-gradient(45deg,#000000,#434343)"
];

/* Hide all cards initially */
cards3.forEach(card => {
  card.style.opacity = 0;
  card.style.transition = "all 0.8s ease";
});

/* Position card off-screen */
function setStartPosition(card, direction){
  if(direction === "right") card.style.transform = "translateX(120vw) scale(0.9)";
  if(direction === "left") card.style.transform = "translateX(-120vw) scale(0.9)";
  if(direction === "top") card.style.transform = "translateY(-120vh) scale(0.9)";
  if(direction === "bottom") card.style.transform = "translateY(120vh) scale(0.9)";
}

/* Show next card */
function showNextCard3(){

  // Hide previous card
  if(current3 > 0){
    const prev = cards3[current3 - 1];
    prev.style.opacity = 0;
    prev.style.transform = "scale(0.95)";
  }

  // If all cards finished → show Next button
  if(current3 >= cards3.length){
    nextBtn3.classList.add("show");   // 🔥 IMPORTANT FIX
    return;
  }

  const card = cards3[current3];
  const dir = directions[current3 % directions.length];

  document.querySelector(".page3 .intentions-bg-animation").style.background =
    colors[current3 % colors.length];

  setStartPosition(card, dir);

  setTimeout(() => {
    card.style.opacity = 1;
    card.style.transform = "translate(0,0) scale(1)";
  }, 50);

  current3++;

  setTimeout(showNextCard3, 5000);  // 5 sec per card
}

/* Overlay click starts animation */
if(overlay3){
  overlay3.addEventListener("click", () => {

    // RESET everything
    current3 = 0;
    nextBtn3.classList.remove("show");

    cards3.forEach(card => {
      card.style.opacity = 0;
    });

    music3.play();
    overlay3.style.display = "none";

    showNextCard3();
  });
}
/* ================= PAGE 4 FINAL CARD – CAKE + TEDDY ================= */


/* ================= PAGE 4 WORKING SLIDESHOW ================= */

let slideInterval4;
let slideIndex4 = 0;

function startPage4Slideshow(){

  const images = document.querySelectorAll(".slideshow img");
  const slideshow = document.getElementById("slideshow");
  const finalCard = document.getElementById("finalCard");

  // RESET EVERYTHING
  slideIndex4 = 0;
  clearInterval(slideInterval4);

  slideshow.style.display = "block";
  finalCard.classList.remove("show");

  images.forEach((img, i) => {
    img.classList.remove("active");
    if(i === 0){
      img.classList.add("active");
    }
  });

  // START SLIDESHOW
  slideInterval4 = setInterval(() => {

    images[slideIndex4].classList.remove("active");
    slideIndex4++;

    if(slideIndex4 >= images.length){
      clearInterval(slideInterval4);
      slideshow.style.display = "none";
      finalCard.classList.add("show");
      return;
    }

    images[slideIndex4].classList.add("active");

  }, 4500);
}
function cutCake(){

  document.getElementById("cake").style.display = "block";
  document.getElementById("popSound").play();

  heartExplosion();

  setTimeout(()=>{
    document.getElementById("teddyHug").classList.add("showTeddy");
  }, 1500);
}



function heartExplosion(){

  const symbols = ["💖","💗","💘","💞","💕","✨"];

  for(let i = 0; i < 80; i++){

    const heart = document.createElement("div");
    heart.innerHTML = symbols[Math.floor(Math.random()*symbols.length)];

    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "60%";
    heart.style.fontSize = (Math.random()*25 + 18) + "px";
    heart.style.pointerEvents = "none";
    heart.style.transition = "transform 1.8s ease-out, opacity 2s ease";

    document.body.appendChild(heart);

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 350 + 120;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    setTimeout(()=>{
      heart.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random()*360}deg)`;
      heart.style.opacity = "0";
    }, 50);

    setTimeout(()=>{
      heart.remove();
    }, 2000);
  }
}
images.forEach((img, i) => {
  img.classList.remove("active");
  img.style.opacity = 0; // reset opacity explicitly
  if(i === 0){
    img.classList.add("active");
    img.style.opacity = 1;
  }
});