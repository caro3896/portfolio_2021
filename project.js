"use strict";

window.addEventListener("DOMContentLoaded", start);

function start(){
    console.log("hello");
    const images = document.querySelectorAll(".image_library img");
    console.log(images);

  images.forEach((img) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.classList.add("fade_in");
        }
      });
    });

    observer.observe(img);
  });
}