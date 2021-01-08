'use strict';

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(
          'Too many server requests. Please try again in a moment'
        );
      return response.json();
    })
    .then(responseData => {
      console.log(`You are in ${responseData.city}, ${responseData.country}`);
      getCountryData(responseData.country);
    })
    .catch(error => {
      console.error(error);
    });
};

const bsas = [-34.618721, -58.361112];
const tuc = [-26.81511, -65.220776];

whereAmI(-26.81511, -65.220776);
