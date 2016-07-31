'use strict';

var btnHamburger = document.querySelector('.main-nav__menu');
var mobileMenu = document.querySelector('.main-nav ul');
var scrollTopBtn = document.querySelector('.scroll-top');
var chapters = document.querySelectorAll('.toc-chapter');
var TOP_MENU_HEIGHT = 100;
var SCROLL_DURATION = 900;
var scrollTimeout;

/**
 * Function shows or hides the Scroll To Top button
 */
var scrollSpy = function() {
  if (window.scrollY > TOP_MENU_HEIGHT || document.documentElement.scrollTop > TOP_MENU_HEIGHT) {
    scrollTopBtn.classList.remove('invisible');
  } else {
    scrollTopBtn.classList.add('invisible');
  }
};

/**
 * Function highlights Active nav link,
 * which chapter content is the closest to the page top
 */
var highlightActiveChapter = function() {
  var activeChapter = chapters[0];
  var activeLink = mobileMenu.children[0];
  activeLink.classList.remove('main-nav__item--active');

  for (var i = 1; i < chapters.length; i++) {
    var top = chapters[i].getBoundingClientRect().top;
    mobileMenu.children[i].classList.remove('main-nav__item--active');
    if (top > TOP_MENU_HEIGHT) continue;
    if ( (top === TOP_MENU_HEIGHT) ||
      (top > activeChapter.getBoundingClientRect().top + TOP_MENU_HEIGHT) ) {
      activeLink = mobileMenu.children[i];
      activeChapter = chapters[i];
    }
  }
  activeLink.classList.add('main-nav__item--active');
};

/**
 * Function activates
 * - scrollSpy()
 * - highlightActiveChapter()
 * in 100 milliseconds after scrolling ends
 */
var pageScroll = function() {

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout( function() {
    scrollSpy();
    highlightActiveChapter();
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

  scrollTo(element, to.offsetTop - TOP_MENU_HEIGHT, SCROLL_DURATION);
  mobileMenu.classList.add('invisible');
};

btnHamburger.addEventListener('click', function() {
  mobileMenu.classList.toggle('invisible');
});

window.addEventListener('scroll', pageScroll);

mobileMenu.addEventListener('click', scrollToAnchor);
scrollTopBtn.addEventListener('click', scrollToAnchor);
