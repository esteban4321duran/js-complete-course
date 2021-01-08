'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const MILLION = 1000000;
///////////////////////////////////////
// *********************************************
//   Old AJAX calls
// *********************************************

// const getCountryDataAndNeighbours = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   //set a callback function to be executed when the asynchronous task of sending the request and retrieving the answer is done
//   request.addEventListener('load', function () {
//     //the this keyword points to the request itself

//     const [responseData] = JSON.parse(this.responseText);
//     console.log(responseData);

//     renderCountryCard(responseData);
//     //get neighbor countries and render them
//     const neighbours = responseData.borders;
//     if (!neighbours) return;

//     neighbours.forEach(function (countryCode) {
//       const request = new XMLHttpRequest();
//       request.open(
//         'GET',
//         `https://restcountries.eu/rest/v2/alpha/${countryCode}`
//       );
//       request.send();
//       request.addEventListener('load', function () {
//         const responseData = JSON.parse(this.responseText);
//         renderCountryCard(responseData);
//       });
//     });
//     // const request2 = new XMLHttpRequest();
//     // request2.open(
//     //   'GET',
//     //   `https://restcountries.eu/rest/v2/alpha/${neighbours[0]}`
//     // );
//     // request2.send();
//     // request2.addEventListener('load', function () {
//     //   const responseData2 = JSON.parse(this.responseText);

//     //   renderCountryCard(responseData2);
//     // });
//   });
// };

// const renderCountryCard = function (countryData) {
//   const html = `
// 		<article class="country">
// 			<img class="country__img" src="${countryData.flag}" />
// 			<div class="country__data">
// 				<h3 class="country__name">${countryData.name}</h3>
// 				<h4 class="country__region">${countryData.region}</h4>
// 				<p class="country__row"><span>👫</span>${(
//           +countryData.population / MILLION
//         ).toFixed(2)} million people</p>
// 				<p class="country__row"><span>🗣️</span>${countryData.languages[0].name}</p>
// 				<p class="country__row"><span>💰</span>${countryData.currencies[0].name}</p>
// 			</div>
// 		</article>
// 	`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// getCountryDataAndNeighbours('argentina');

// *********************************************
//   New AJAX calls syntax
// *********************************************
// const request = fetch(`https://restcountries.eu/rest/v2/name/argentina`);

// console.log(request);

// // const getCountryData = function (country) {
// //   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// //     .then(response => response.json())
// //     .then(response => {
// //       console.log(response);
// //       const [countryData] = response;
// //       renderCountryCard(countryData);

// //       const neighbours = countryData.borders;
// //       if (!neighbours) return;

// //       neighbours.forEach(function (countryCode) {
// //         fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
// //           .then(response => response.json())
// //           .then(response => renderCountryCard(response));
// //       });
// //     });
// // };
// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(response => {
//       console.log(response);
//       const [countryData] = response;
//       clearCountryCard();
//       renderCountryCard(countryData);

//       const neighbours = countryData.borders;
//       if (!neighbours) throw new Error('No neighbour found');
//       //return the promise of more country data
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbours[0]}`,
//         'Neighbour country not found'
//       );
//     })
//     .then(countryData => renderCountryCard(countryData, 'neighbour'))
//     .catch(error => {
//       console.error(error.message);
//       renderError(error);
//     });
// };
// const clearCountryCard = function () {
//   countriesContainer.innerHTML = '';
// };

// const renderCountryCard = function (countryData, neighbour = '') {
//   const html = `
//   		<article class="country${' ' + neighbour}">
//   			<img class="country__img" src="${countryData.flag}" />
//   			<div class="country__data">
//   				<h3 class="country__name">${countryData.name}</h3>
//   				<h4 class="country__region">${countryData.region}</h4>
//   				<p class="country__row"><span>👫</span>${(
//             +countryData.population / MILLION
//           ).toFixed(2)} million people</p>
//   				<p class="country__row"><span>🗣️</span>${countryData.languages[0].name}</p>
//   				<p class="country__row"><span>💰</span>${countryData.currencies[0].name}</p>
//   			</div>
//   		</article>
//     `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError = function (error) {
//   countriesContainer.insertAdjacentText('beforeend', `${error.message}`);
//   countriesContainer.style.opacity = 1;
// };
// getCountryData('Brasil');

// *********************************************
//   Handling rejected promises
// *********************************************

// btn.addEventListener('click', () => getCountryData('Argentina'));

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// *********************************************
//   Event loop in practice
// *********************************************
console.log('Test start');

setTimeout(
  () =>
    console.log(
      'Callback put in callback q. after 0 secs. executed after more than 0 secs >:/'
    ),
  0
);
Promise.resolve('Resolved promise 1').then(response => console.log(response));
Promise.resolve('Resolved promise 2').then(response => {
  for (let i = 0; i < 2000000000; i++) {}
  console.log(response);
});

// Promise.resolve('Resolved promise 3').then(response => console.log(response));
// Promise.resolve('Resolved promise 4').then(response => console.log(response));

console.log('Test end');
