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
