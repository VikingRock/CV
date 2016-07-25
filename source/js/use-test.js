'use strict';

var Test = require('test');

var btnHamburger = document.querySelector('.main-nav__menu');
var mobileMenu = document.querySelector('.main-nav ul');
var scrollTopBtn = document.querySelector('.scroll-top');
var chapters = document.querySelectorAll('.toc-chapter');
var topMenuHeight = 100;
var scrollDuration = 900;
var scrollTimeout;

var toggleVisible = function() {
  mobileMenu.classList.toggle('invisible');
};

/**
 * Function
 * - shows or hides the Scroll To Top button
 * - highlights active chapter
 * depending on the page scroll
 */
var pageScroll = function() {

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout( function() {
    if (window.scrollY > 100 || document.documentElement.scrollTop > 100) {
      scrollTopBtn.classList.remove('invisible');
    } else {
      scrollTopBtn.classList.add('invisible');
    }

    var currentActive = document.querySelector('.main-nav__item--active');
    for (var i = 0; i < chapters.length; i++) {
      var top = chapters[i].getBoundingClientRect().top;
      if (top > 0) continue;
      if ( (top === 0) || (top > currentActive.getBoundingClientRect().top) ) {
        currentActive.classList.remove('main-nav__item--active');
        currentActive = mobileMenu.children[i];
      }
    }
    currentActive.classList.add('main-nav__item--active');

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

/**
 * Function fires scrollTo function for target element
 * @param event
 */
var scrollToAnchor = function(event) {
  event.preventDefault();
  var target = event.target;
  if (target.tagName.toUpperCase() !== 'A') return;

  var anchor = target.getAttribute('href');
  anchor = anchor.substr(1);
  var to = document.getElementById(anchor);

  //hack to make this shit work in FF an IE
  document.documentElement.scrollTop+=1;
  if (document.documentElement.scrollTop) {
    var element = document.documentElement
  } else {
    var element = document.body;
  }

  scrollTo(element, to.offsetTop - topMenuHeight, scrollDuration);
  mobileMenu.classList.add('invisible');
};

btnHamburger.addEventListener('click', toggleVisible);

window.addEventListener('scroll', pageScroll);

mobileMenu.addEventListener('click', scrollToAnchor);
scrollTopBtn.addEventListener('click', scrollToAnchor);
