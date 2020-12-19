//**********************************************
// CODING CHALLENGE #1
//**********************************************
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const printGoals = function (...players) {
  console.log(`Goals scored: ${players.length}`);
  console.log(`Scoring players:`);
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }
};
// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
//There`s a better way of doing this. Since the game already contains two arrays, we don't have to create new arrays, we can simply assign their references to variables. Initialize two variables from an array of arrays ==> DESTRUCTURING is what we need
const [players1, players2] = game.players;

const [gk, ...fieldPlayers] = players1;

const allPlayers = [...players1, ...players2];

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const { team2: team2, team1: team1, x: draw } = game.odds;
//The same but with nested destructuring
const {
  odds: { team1: t1, team2: t2, x: d },
} = game;

console.log(team2, team1, draw);
console.log(t1, t2, d);

printGoals(...game.scored);

team1 < team2 && console.log('Team 1 is more likely to win.');
team2 < team1 && console.log('Team 2 is more likely to win.');
team1 === team2 && console.log('A draw between team 1 & team 2 is expected');

//**********************************************
// CODING CHALLENGE #2
//**********************************************

console.log('\n\n');
for (const [goalN, player] of game.scored.entries()) {
  console.log(`Goal ${goalN + 1}: ${player}`);
}

let sum = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  sum += odd;
}
const avgOdd = sum / odds.length;
console.log(`Odds average: ${avgOdd}`);

const {
  team1: team1Name,
  team2: team2Name,
  odds: { team1: team1Odds, team2: team2Odds, x: drawOdds },
} = game;

console.log(`Odd of victory ${team1Name}: ${team1Odds}`);
console.log(`Odd of draw: ${drawOdds}`);
console.log(`Odd of victory ${team2Name}: ${team2Odds}`);

//get the scorer names without repetition
const scorerNames = [];
for (const player of game.scored) {
  if (!scorerNames.includes(player)) scorerNames.push(player);
}

//Build scorers object
const scorers = {
  [scorerNames[0]]: 0,
  [scorerNames[1]]: 0,
  [scorerNames[2]]: 0,
};

//register goals per player
for (const player of game.scored) {
  scorers[`${player}`]++;
}

console.log(scorers);
//**********************************************
// CODING CHALLENGE #3
//**********************************************
const gameEvents = new Map([
  [17, 'GOAL'],
  [36, 'Substitution'],
  [47, 'GOAL'],
  [61, 'Substitution'],
  [64, 'Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, 'GOAL'],
  [80, 'GOAL'],
  [92, 'Yellow card'],
]);

//the yellow card at minute 64 was unfair. remove it
gameEvents.delete(64);

const events = [...new Set(gameEvents.values())];
console.log('\n\n');

// let timeDifSum = 0;
// let last;
// for (const [time, event] of events) {
//   last = last ?? time; //for the first iteration init last to the first time on the event array
//   timeDifSum += time - last;
//   last = time;
// }
// console.log(
//   `An event happened every ${timeDifSum / events.length} minutes on average`
// );

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

for (const [time, event] of gameEvents) {
  console.log(`${time <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'}: ${event}`);
}
