'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:	C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(`What is your favourite programming language?
		0:Javascript
		1:Python
		2:Rust
		3:C++
		(write option number)`)
    );
    if (answer === 0 || answer === 1 || answer === 2 || answer === 3) {
      this.answers[answer]++;
    } else {
      console.log(`Invalid answer`);
    }
    this.displayResults('array');
    this.displayResults('string');
  },
  displayResults(type) {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log('Poll results are ' + this.answers.join(', '));
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const data1 = {
  answers: [5, 2, 3],
};
const data2 = {
  answers: [1, 5, 3, 9, 6, 1],
};
poll.displayResults.call(data1, 'array');
poll.displayResults.call(data2, 'array');
poll.displayResults.call(data1, 'string');
poll.displayResults.call(data2, 'string');
