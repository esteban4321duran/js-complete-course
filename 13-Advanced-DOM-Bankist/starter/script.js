'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
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
