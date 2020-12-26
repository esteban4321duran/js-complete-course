(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('.poll').textContent = 'Change header color';
  document.querySelector('.poll').addEventListener('click', function () {
    const possibleHexColors = 16777215;
    const randomColor = Math.round(Math.random() * possibleHexColors).toString(
      16
    );
    header.style.color = `#${randomColor}`;
  });
})();

// This IIFE is called when the script is loaded in the browser.
// Inside it we select the <h1> element and store it in the header variable. Then we change its color. Lastly we add an event listener to one of the buttons.
// The addEventListener function is a higher-order function, because it receives a callback function, that will handle all click events on the button.
// After adding the event listener, the IIFE finishes its execution and the execution context that it created is popped-out from the call stack.

// However, the event handler is able to perform its job due to a closure. This callback function closed-over the header variable from the variable environment of the parent execution context.
// This way any time the event listener is called, it has access to the header element and is able to modify its color.
