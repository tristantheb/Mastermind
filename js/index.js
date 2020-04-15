document.addEventListener('DOMContentLoaded', function () {
  /**
   * Init the rows selector
   */
  var $rows = document.querySelectorAll('.game-row > .col-game');
  var lines = 0;
  for (let $row of $rows) {
    lines++;
    $row.setAttribute('id', `row${lines}`);
  }

  /**
   * Generate a new game
   */
  var game = new Mastermind(lines);

  /**
   * Assign the event listner to all buttons
   */
  var $buttons = document.querySelectorAll('.control');
  for (let $button of $buttons) {
    $button.addEventListener('click', function () {
      let color;
      // IMPROVE: Improve this part of code
      if ($button.classList.contains('green')) {
        color = 'green';
      } else if ($button.classList.contains('red')) {
        color = 'red';
      } else if ($button.classList.contains('blue')) {
        color = 'blue';
      } else if ($button.classList.contains('yellow')) {
        color = 'yellow';
      }
      // Add into the current try array
      game.addColor(color);
    });
  }
  $validBtn = document.querySelector('.submit');
  $validBtn.addEventListener('click', function () {
    // TEMP: Console need to be changed by DOM action
    console.log(game.validateCombination());
  });
  $resetLastBtn = document.querySelector('.reset-last');
  $resetLastBtn.addEventListener('click', function () {
    game.removeColor();
  });
});