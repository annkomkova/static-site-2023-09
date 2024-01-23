/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

console.error('===============================');
// функция hello-bye
// function hello() {
//   const header = document.querySelector('h1')
//   if (header.innerHTML === 'Hello!') {
//     header.innerHTML = 'Bye!'
//   } else {
//     header.innerHTML = 'Hello!'
//   }
// }

// функция-счётчик
// let counter = 0
// function count() {
//   counter++
//   document.querySelector('h1').innerHTML = counter

//   if (counter % 10 === 0) {
//     alert(`And this is ${counter}!`)
//   }
// }

// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('button').onclick = count
// })

// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('button').addEventListener('click', count)
// })

// document.querySelector('form').onsubmit = function () {
//   const name = document.querySelector('#name').value
//   alert(`Hello, ${name}!`)
// }

// функция смена цвета шрифта по клику
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('#red').onclick = function () {
//     document.querySelector('h1').style.color = '#FF2010'
//   }
//   document.querySelector('#green').onclick = function () {
//     document.querySelector('h1').style.color = 'green'
//   }
//   document.querySelector('#blue').onclick = function () {
//     document.querySelector('h1').style.color = 'blue'
//   }
// })

// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelectorAll('button').forEach(function (button) {
//     button.onclick = function () {
//       document.querySelector('h1').style.color = button.dataset.color
//     }
//   })
// })

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#red').onclick = function () {
    document.querySelector('#red').classList.add('opacity');
  };
  document.querySelector('#blue').onclick = function () {
    document.querySelector('#blue').classList.remove('border');
  };
  document.querySelector('.gold').onclick = function () {
    document.querySelector('.gold').classList.toggle('green');
  };
});
/******/ })()
;