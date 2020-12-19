'use strict';

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const showScores = (score1, score2) => {
    console.log(score1);
    console.log(score2);
}
const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins > avgKoalas && avgDolphins > 2 * avgKoalas) {
        console.log(`The dolphins win`);
        console.log(`The koalas lose`);
    } else if (avgKoalas > avgDolphins && avgKoalas > 2 * avgDolphins) {
        console.log(`The koalas win`);
        console.log(`The dolphins lose`);
    } else if (avgDolphins === avgKoalas) {
        console.log(`There was a draw`);
    } else {
        console.log(`No team met the required score.`)
    }
}


const dolphins1 = 85;
const dolphins2 = 54;
const dolphins3 = 41;

const koalas1 = 23;
const koalas2 = 34;
const koalas3 = 28;

const dolphinsAvg = calcAverage(dolphins1, dolphins2, dolphins3);
const koalasAvg = calcAverage(koalas1, koalas2, koalas3);

showScores(dolphinsAvg, koalasAvg);
checkWinner(dolphinsAvg, koalasAvg);
