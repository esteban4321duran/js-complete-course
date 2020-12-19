const dolphinsScore1 = 100;
const dolphinsScore2 = 100;
const dolphinsScore3 = 1000;

const koalasScore1 = 1000;
const koalasScore2 = 100;
const koalasScore3 = 100;

const dolphinsAverage = (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3;
const koalasAverage = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

//Display results
console.log(`Dolphins Average score: ${dolphinsAverage}`);
console.log(`Koalas Average score: ${koalasAverage}`);

if (dolphinsAverage > koalasAverage && dolphinsAverage >= 100)
    console.log(`The Dolphins win gg ez mvp!!!`);
else if (koalasAverage > dolphinsAverage && koalasAverage >= 100)
    console.log(`The Koalas win gg ez mvp!!!`);
else if (dolphinsAverage === koalasAverage && dolphinsAverage >= 100)
    console.log(`There was a draw. gg wp!!!`);
else
    console.log(`No team met the required score. gg no team u suck`);

