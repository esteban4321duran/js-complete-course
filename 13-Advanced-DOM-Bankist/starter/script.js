'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const h1 = document.querySelector('h1');
const nav = document.querySelector('.nav');
const containerNavLinks = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

///////////////////////////////////////////////////////
// event handlers
///////////////////////////////////////////////////////

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', e => {
  // const section1Coords = section1.getBoundingClientRect();
  // console.log(section1Coords);
  // e.target.style.backgroundColor = '#0f0';
  // console.log(e.target.getBoundingClientRect());
  // console.log(`current scroll: (${window.pageXOffset},${window.pageYOffset})`);
  // console.log(
  //   `viewport width, height: ${document.documentElement.clientWidth},${document.documentElement.clientHeight}`
  // );

  //old way of doing smooth scrolling
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //new way of doing smooth scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////////////////////
// page navigation implementing event delegation
///////////////////////////////////////////////////////
// // unefficient way: adding identical event handlers to elements

// navLinks.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const destElementID = this.getAttribute('href');
//     document
//       .querySelector(destElementID)
//       .scrollIntoView({ behavior: 'smooth' });
//   });
// });

// // efficient way, using event delegation
containerNavLinks.addEventListener('click', function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////////////////
// LECTURES
///////////////////////////////////////////////////////
// **********************************************
//selecting nodes
// **********************************************
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const sections = document.querySelectorAll('.section');
// console.log(sections);

// const buttons = document.getElementsByTagName('button');
// console.log(buttons);

// **********************************************
// creating & inserting nodes
// **********************************************
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies to provide improved functionality & analytics';
message.innerHTML =
  'We use cookies to provide improved functionality & analytics. <button class="btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('.header');
// header.prepend(message);
header.append(message);
// const [, , , openAcc1] = document.querySelectorAll('a');
// header.append(openAcc1);

// **********************************************
// Deleting nodes
// **********************************************
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

document.documentElement.style.setProperty('--color-primary', 'purple');

//**********************************************
// styles
// **********************************************
message.style.backgroundColor = '#37383d';
// console.log(message.style.height);
// console.log(getComputedStyle(message));
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//**********************************************
// attributes
// **********************************************
// const logo = document.querySelector('.nav__logo');

// console.log(logo.alt);
// console.log(logo.className);

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// //data attributes
// console.log(logo.dataset.versionNumber);

//**********************************************
// implementing event listeners
// **********************************************
// const h1Alert = () => {
//   alert("You're reading the heading");
//   h1.removeEventListener('mouseenter', h1Alert);
// };
// h1.addEventListener('mouseenter', h1Alert);

//**********************************************
// event propagation
// **********************************************
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// // link1.addEventListener('click', e => {
// //   console.log(this);//the mistke here is that arrow functions dont get a this keyword
// //   this.style.backgroundColor = randomColor();
// // });

// //The click event is generated in the root of the DOM tree
// //event travels down the DOM tree to the target element
// navLinks.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(e.target, e.currentTarget);
//     e.stopPropagation();
//   });
// });
// //after its target phase, the event bubbles up to the root node, document.
// //if we attach an event listener for the same type of event on each of the
// //event target parent elements, the event will be handled by them as well as
// //it travels up through the DOM tree
// containerNavLinks.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// nav.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.body.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
