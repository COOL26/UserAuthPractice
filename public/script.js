const menu = document.getElementById("menu");
const cover = document.getElementsByClassName("cover");
let val = 0;
menu.addEventListener("click", () => {
  console.log("clicked!");
  if (val === 1) {
    cover[0].style.display = "none";
    val = 0;
  } else {
    cover[0].style.display = "block";
    val = 1;
  }
});

//JS for modal functionality:
const modal = document.getElementById("modal");
const getStartedBtn = document.getElementById("getStartedBtn");
const backdrop = document.getElementById("backdrop");
const body = document.getElementsByTagName("body")[0];

getStartedBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  backdrop.style.display = "block";
  body.style.overflowY = "hidden";
});

backdrop.addEventListener("click", () => {
  modal.style.display = "none";
  backdrop.style.display = "none";
  body.style.overflowY = "auto";
});
