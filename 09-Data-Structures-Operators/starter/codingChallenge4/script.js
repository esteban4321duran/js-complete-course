const camelCaseConverter = {
  convert() {
    let words;
    let first;
    let others;
    let buffer;
    const output = [];
    let lineCount = 1;
    let inputText = textArea.value.split('\n');
    for (const line of inputText) {
      words = line.toLowerCase().trim().split('_');
      [first, ...others] = words;
      buffer = [];
      for (let word of others) {
        // word = word[0].toUpperCase() + word.slice(1);
        //perform capitalization on each word that's not the first one.
        buffer.push(word[0].toUpperCase() + word.slice(1));
      }
      output.push(
        `${[first, ...buffer, ''.padStart(lineCount, '*')].join('')}\n`
      );
      lineCount++;
    }
    textArea.value = '';
    for (const line of output) textArea.value += line;
  },
};

//DOM manipulation
//insert the textarea for input
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textArea = document.querySelector('textarea');
textArea.rows = 5;
textArea.cols = 80;
const button = document.querySelector('button');
button.addEventListener('click', camelCaseConverter.convert);

button.textContent = 'Convert to CamelCase';
