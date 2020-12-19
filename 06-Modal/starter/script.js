'use strict';

const displayModalWindow = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};
const closeModalWindow = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
const testForEscapeKey = function (keyEvent) {
    if (keyEvent.key === 'Escape' && !modal.classList.contains('hidden'))
        //check if the modal window is not hidden
        closeModalWindow();
    //if its not hidden, close it
};

//Retrieve requiered elements
const modal = document.querySelector('.modal'); //the modal window
const overlay = document.querySelector('.overlay'); //blurred backdrop for the modal window
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); //this is a NodeList

//subscribe event listeners
for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', displayModalWindow);
}

btnCloseModal.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);
document.addEventListener('keydown', testForEscapeKey);
