'use strict';

var Test = require('test');

console.log(Test);

var btnHamburger = document.querySelector('.main-nav__menu');
var mobileMenu = document.querySelector('.main-nav ul');

var toggleVisible = function() {
  mobileMenu.classList.toggle('invisible');
};

btnHamburger.addEventListener('click', toggleVisible);

