"use strict";

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const images = document.querySelectorAll(".image");

function slide() {
  images.forEach((image) => {
    // half way through the image
    const slideInAt = window.scrollY + window.innerHeight - image.height / 2;
    // bottom of the image
    const bottomImage = image.offsetTop + image.height;
    const imageAtCenter = slideInAt > image.offsetTop;
    const stillInRange = window.scrollY < bottomImage;
    if (imageAtCenter && stillInRange) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(slide));
