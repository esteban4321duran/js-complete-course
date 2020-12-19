'use strict'
// //******* switch statements ********//
// const language = 'spanish';

// function rankLanguage(language) {
//     switch (language) {
//         case 'chinese':
//             console.log(`${language}: MOST number of native speakers!`);
//             break;
//         case 'spanish':
//             console.log(`${language}: 2nd place in number of native speakers`);
//             break;
//         case 'english':
//             console.log(`${language}: 3rd place`);
//             break;
//         case 'hindi':
//             console.log(`${language}: 4th place`);
//             break;
//         case 'arabic':
//             console.log(`${language}: 5th place`);
//             break;
//         default:
//             console.log('Great language too (sucker)');
//     }
// }
// rankLanguage(language);


// //******* conditional/ternary operator ********//
// const population = 44; //millions
// const country = 'Argentina';

// function hasAvgPopulation(country, population) {
//     console.log(`${country}'s population (${population}) is ${population > 33 ? 'above' : 'below'} average.`);
// }

// hasAvgPopulation(country, population);



// //***** Functions *******//
// console.log(`
//         Functions`);

// const country1 = 'Argentina';
// const population1 = 44;
// const capitalCity1 = 'Buenos Aires';

// const country2 = 'Chile';
// const population2 = 18;
// const capitalCity2 = 'Santiago de Chile';

// const country3 = 'Uruguay';
// const population3 = 3;
// const capitalCity3 = 'Montevideo';

// function describeCountry(country, population, capitalCity) {
//     return `${country} has ${population} million people and its capital city is ${capitalCity}`;
// }

// const description1 = describeCountry(country1, population1, capitalCity1);
// const description2 = describeCountry(country2, population2, capitalCity2);
// const description3 = describeCountry(country3, population3, capitalCity3);

// console.log(description1);
// console.log(description2);
// console.log(description3);


// //***** Functions Declarations vs Function expressions *******//
// function percentageOfWorld1(population) {
//     return (population * 100) / 7900;
// }
// const percentageOfWorld2 = function (population) {
//     return (population * 100) / 7900;
// }

// const percentageOfWorld3 = population => (population * 100) / 7900;

// const china = 1400;
// const argentina = 44;
// const usa = 328;

// let percent1 = percentageOfWorld1(china);
// let percent2 = percentageOfWorld1(argentina);
// let percent3 = percentageOfWorld1(usa);
// console.log(percent1);
// console.log(percent2);
// console.log(percent3);

// percent1 = percentageOfWorld2(china);
// percent2 = percentageOfWorld2(argentina);
// percent3 = percentageOfWorld2(usa);
// console.log(percent1);
// console.log(percent2);
// console.log(percent3);

// percent1 = percentageOfWorld3(china);
// percent2 = percentageOfWorld3(argentina);
// percent3 = percentageOfWorld3(usa);
// console.log(percent1);
// console.log(percent2);
// console.log(percent3);


// //***** Arrow functions *******//
// const describePopulation = (country, population) => `${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world population.`;

// const country1 = 'China';
// const population1 = 1400;

// const country2 = 'Argentina';
// const population2 = 44;

// const country3 = 'USA';
// const population3 = 328;

// percent1 = describePopulation(country1, population1);
// percent2 = describePopulation(country2, population2);
// percent3 = describePopulation(country3, population3);
// console.log(percent1);
// console.log(percent2);
// console.log(percent3);