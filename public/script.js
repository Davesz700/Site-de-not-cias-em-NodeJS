
var news = document.querySelectorAll(".div-not");
var caroussel = document.querySelector(".slide");
var c_index = 0;
setTimeout(slide, 2000);

function isElementVisible(element) {
  var bounding = element.getBoundingClientRect();
  var isVisible =
    bounding.top >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight);

  return isVisible;
}
function slide() {
  if (isElementVisible(caroussel)) {
  
    let transform = news[0].offsetWidth * -1;
    if (c_index >= news.length - 1) {
        c_index = 0;
    } else {
        c_index++;
    }
    transform = transform * c_index;
    caroussel.style.transform = "translateX(" + transform + "px)";
  }
  setTimeout(slide, 2000);
}
