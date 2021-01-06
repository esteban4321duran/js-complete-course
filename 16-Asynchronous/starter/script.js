'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const MILLION = 1000000;

const getCountryDataAndNeighbours = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  //set a callback function to be executed when the asynchronous task of sending the request and retrieving the answer is done
  request.addEventListener('load', function () {
    //the this keyword points to the request itself

    const [responseData] = JSON.parse(this.responseText);
    console.log(responseData);

    renderCountryCard(responseData);
    //get neighbor countries and render them
    const neighbours = responseData.borders;
    if (!neighbours) return;

    neighbours.forEach(function (countryCode) {
      const request = new XMLHttpRequest();
      request.open(
        'GET',
        `https://restcountries.eu/rest/v2/alpha/${countryCode}`
      );
      request.send();
      request.addEventListener('load', function () {
        const responseData = JSON.parse(this.responseText);
        renderCountryCard(responseData);
      });
    });
    // const request2 = new XMLHttpRequest();
    // request2.open(
    //   'GET',
    //   `https://restcountries.eu/rest/v2/alpha/${neighbours[0]}`
    // );
    // request2.send();
    // request2.addEventListener('load', function () {
    //   const responseData2 = JSON.parse(this.responseText);

    //   renderCountryCard(responseData2);
    // });
  });
};

const renderCountryCard = function (countryData) {
  const html = `
		<article class="country">
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

getCountryDataAndNeighbours('usa');
