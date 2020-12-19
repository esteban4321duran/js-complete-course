'use strict';

// 1) understand the problem
// i need to display a string with the temperature for each day
// The array already has what i need to display, so i don't need to do any calculations

// 2) Divide in subproblems
// 1_insert the temperature for the respective day in a template literal

const printForecast = function (temperatures) {
    let msg = '';
    for (let i = 0; i < temperatures.length; i++) {
        msg += `${i === 0 ? '' : ' '}...${temperatures[i]}ºC in ${i + 1} ${
            i === 0 ? 'day' : 'days'
        }`;
    }
    console.log(msg);
};

const forecastesMaxTemps = [12, 5, -5, 0, 4];

printForecast(forecastesMaxTemps);
