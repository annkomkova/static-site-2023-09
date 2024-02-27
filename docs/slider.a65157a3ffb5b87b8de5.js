/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

var currentSlide = 0;
function toggleModal() {
  var body = document.body;
  body.classList.toggle('modal');
}
function toggleAside() {
  var post = document.querySelector('.post');
  post.classList.toggle('aside');
}
function slide(direction) {
  var rail = document.querySelector('.rail');
  if (direction === 'next') {
    currentSlide++;
  } else if (direction === 'prev') {
    currentSlide--;
  }
  rail.style.transform = 'translateX(-' + currentSlide * 664 + 'px)';
}
document.addEventListener('DOMContentLoaded', function (e) {
  var postTeasers = document.getElementsByClassName('postTeaser');
  var modalFader = document.querySelector('.fader');
  var asideButton = document.querySelector('.asideButton');
  var sliderButtonLeft = document.querySelector('.sliderButton.left');
  var sliderButtonRight = document.querySelector('.sliderButton.right');
  for (var i = 0; i < postTeasers.length; i++) {
    postTeasers[i].addEventListener('click', toggleModal);
  }
  modalFader.addEventListener('click', toggleModal);
  asideButton.addEventListener('click', toggleAside);
  sliderButtonLeft.addEventListener('click', function () {
    slide('prev');
  });
  sliderButtonRight.addEventListener('click', function () {
    slide('next');
  });
});
/******/ })()
;