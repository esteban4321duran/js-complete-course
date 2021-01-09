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
const request = fetch(`https://restcountries.eu/rest/v2/name/argentina`);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(response => {
//       console.log(response);
//       const [countryData] = response;
//       renderCountryCard(countryData);

//       const neighbours = countryData.borders;
//       if (!neighbours) return;

//       neighbours.forEach(function (countryCode) {
//         fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
//           .then(response => response.json())
//           .then(response => renderCountryCard(response));
//       });
//     });
// };
const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(response => {
      console.log(response);
      const [countryData] = response;
      clearCountryCard();
      renderCountryCard(countryData);

      const neighbours = countryData.borders;
      if (!neighbours) throw new Error('No neighbour found');
      //return the promise of more country data
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbours[0]}`,
        'Neighbour country not found'
      );
    })
    .then(countryData => renderCountryCard(countryData, 'neighbour'))
    .catch(error => {
      console.error(error.message);
      renderError(error);
    });
};
const clearCountryCard = function () {
  countriesContainer.innerHTML = '';
};

const renderCountryCard = function (countryData, neighbour = '') {
  const html = `
  		<article class="country${' ' + neighbour}">
  			<img class="country__img" src="${countryData.flag}" />
  			<div class="country__data">
  				<h3 class="country__name">${countryData.name}</h3>
  				<h4 class="country__region">${countryData.region}</h4>
  				<p class="country__row"><span>👫</span>${(
            +countryData.population / MILLION
          ).toFixed(2)} million people</p>
  				<p class="country__row"><span>🗣️</span>${countryData.languages[0].name}</p>
  				<p class="country__row"><span>💰</span>${countryData.currencies[0].name}</p>
  			</div>
  		</article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (error) {
  countriesContainer.insertAdjacentText('beforeend', `${error.message}`);
  countriesContainer.style.opacity = 1;
};
// getCountryData('Brasil');

// *********************************************
//   Handling rejected promises
// *********************************************

// btn.addEventListener('click', () => getCountryData('Argentina'));

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// *********************************************
//   Event loop in practice
// *********************************************
// console.log('Test start');

// setTimeout(
//   () =>
//     console.log(
//       'Callback put in callback q. after 0 secs. executed after more than 0 secs >:/'
//     ),
//   0
// );
// Promise.resolve('Resolved promise 1').then(response => console.log(response));
// Promise.resolve('Resolved promise 2').then(response => {
//   for (let i = 0; i < 2000000000; i++) {}
//   console.log(response);
// });

// // Promise.resolve('Resolved promise 3').then(response => console.log(response));
// // Promise.resolve('Resolved promise 4').then(response => console.log(response));

// console.log('Test end');

// *********************************************
//   Building promises
// *********************************************

// console.log('some sync code');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN :D !!!');
//     } else {
//       reject(new Error('You lose T_T'));
//     }
//   }, 1000);
// });

// console.log('Some other sync code');

// lotteryPromise
//   .then(result => console.log(result))
//   .catch(error => console.error(error.message));

// const parameters = {
//   seconds: 2,
// };

// //promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log(`I waited what you asked me to`);
//     return wait(2);
//   })
//   .then(() => console.log('I waited what you asked me to'));

// const tick = function () {
//   return new Promise(resolve => {
//     setTimeout(resolve, 1000);
//   });
// };

// tick()
//   .then(() => {
//     console.log('1 second passed');
//     return tick();
//   })
//   .then(() => {
//     console.log('1 second passed');
//     return tick();
//   })
//   .then(() => {
//     console.log('1 second passed');
//     return tick();
//   })
//   .then(() => {
//     console.log('1 second passed');
//     return tick();
//   });

// *********************************************
//  Promisifying geolocation & reverse geocoding APIs
// *********************************************
//To promisify callback based behaviour, replace the callback with the resolve or reject parameters of the Promise constructor executor function parameter

// const getCurrentPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function () {
//   getCurrentPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(
//           'Too many server requests. Please try again in a moment'
//         );
//       return response.json();
//     })
//     .then(responseData => {
//       console.log(`You are in ${responseData.city}, ${responseData.country}`);
//       getCountryData(responseData.country);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };

// btn.addEventListener('click', whereAmI);

// **************************************************
//  Async/Await
// **************************************************

const getCurrentPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const position = await getCurrentPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    const responseGeoCoding = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    if (!responseGeoCoding.ok)
      throw new Error(
        `Too many server requests. Try again in a moment (${responseGeoCoding.status})`
      );
    const dataGeoCoding = await responseGeoCoding.json();
    // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response =>
    //   return response.json();
    // ).then(couyntryData => ...);

    //is the exact same as

    const responseCountry = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeoCoding.countgry}`
    );
    if (!responseCountry.ok)
      throw new Error(`Country not found (${responseCountry.status})`);

    const [countryData] = await responseCountry.json();
    renderCountryCard(countryData);

    return `${dataGeoCoding.city}, ${dataGeoCoding.country}`;
  } catch (error) {
    console.error(error);
    renderError(error);

    //Reject the promise returned from async function as well
    throw error;
  }
};
// whereAmI();
// console.log('First');

// **************************************************
// returning from async functions
// **************************************************

console.log('1) Getting location');
// const msg = whereAmI(); //async functions returns promises. Placeholders for future values, i.e. resolved later
// console.log(msg);

// this...
// whereAmI()
//   .then(locationMsg => console.log(`2) You are in ${locationMsg}`))
//   .catch(error => console.error(error.message))
//   .finally(() => console.log('3) Finished getting location'));
// is the exact same as...
(async () => {
  try {
    const locationMsg = await whereAmI();
    console.log(`2) You are in ${locationMsg}`);
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log('3) Finished getting location');
  }
})();
