'use strict';

var Test = require('test');

var btnHamburger = document.querySelector('.main-nav__menu');
var mobileMenu = document.querySelector('.main-nav ul');
var scrollTopBtn = document.querySelector('.scroll-top');
var topMenuHeight = 100;
var scrollTimeout;

var toggleVisible = function() {
  mobileMenu.classList.toggle('invisible');
};

/**
 * Function shows or hides the Scroll To Top button
 * depending on the page scroll
 */
var scrollTopToggle = function() {

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout( function() {
    if (window.scrollY > 100) {
      scrollTopBtn.classList.remove('invisible');
    } else {
      scrollTopBtn.classList.add('invisible');
    }
  }, 100);
};

/**
 * Function smoothly scrolls the @element to @to
 * @param {Element} element
 * @param {Element} to
 * @param {number} duration
 */
var scrollTo = function (element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

var scrollToAnchor = function(event) {
  event.preventDefault();
  var target = event.target;
  if (target.tagName.toUpperCase() !== 'A') return;

  var anchor = target.getAttribute('href');
  anchor = anchor.substr(1);
  var to = document.getElementById(anchor);

  //hack to make this shit work in FF
  if (document.documentElement.scrollTop++) {
    var element = document.documentElement
  } else {
    var element = document.body;
  }

  scrollTo(element, to.offsetTop - topMenuHeight, 900);
  mobileMenu.classList.add('invisible');
};

btnHamburger.addEventListener('click', toggleVisible);

window.addEventListener('scroll', scrollTopToggle);

mobileMenu.addEventListener('click', scrollToAnchor);
scrollTopBtn.addEventListener('click', scrollToAnchor);
