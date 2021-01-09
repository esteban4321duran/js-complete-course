'use strict';
////////////////////////////////////////////////////
// Coding challenge 1
////////////////////////////////////////////////////
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
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

// const bsas = [-34.618721, -58.361112];
// const tuc = [-26.81511, -65.220776];

// whereAmI(-26.81511, -65.220776);

////////////////////////////////////////////////////
// Coding challenge 2
////////////////////////////////////////////////////
const containerImages = document.querySelector('.images');
const imgPath1 = 'img/img-1.jpg';
const imgPath2 = 'img/img-2.jpg';

document.querySelector('.btn-country').style.display = 'none';
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath; //Async task
    img.addEventListener('load', () => {
      renderImage(img);
      resolve(img);
    });
    img.addEventListener('error', () => reject(new Error('Image not found')));
  });
};
const renderImage = function (img) {
  containerImages.append(img);
};
const hideImg = function (img) {
  img.style.display = 'none';
};
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
let displayedImg;

createImage(imgPath1)
  .then(img => {
    displayedImg = img;
    return wait(2);
  })
  .then(() => {
    hideImg(displayedImg);
    return createImage(imgPath2);
  })
  .then(img => {
    displayedImg = img;
    return wait(2);
  })
  .then(() => {
    hideImg(displayedImg);
  })
  .catch(error => console.error(error));
