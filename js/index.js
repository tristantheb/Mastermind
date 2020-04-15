document.addEventListener('DOMContentLoaded', function () {
  /**
   * Init the rows selector
   */
  var gameSize = 4;
  var lines;

  function initRow() {
    var $rows = document.querySelectorAll('.game-row > .col-game');
    lines = 0;
    for (let $row of $rows) {
      lines++;
      $row.setAttribute('id', `row${lines}`);
    }
  }
  initRow();

  /**
   * Generate a new game
   */
  var game = new Mastermind(gameSize, lines);
  var color;

  /**
   * Assign the event listner to all buttons
   */
  var $buttons = document.querySelectorAll('.control');
  for (let $button of $buttons) {
    $button.addEventListener('click', function () {
      if (game.userCombination.length === gameSize) return;
      // Check if the color in array is === of the class and add this color to the game
      for (let i = 0; i < game.VALID_COLORS.length; i++) {
        if ($button.classList.contains(game.VALID_COLORS[i])) {
          color = game.VALID_COLORS[i];
          toggleColorIntoGame(color, game);
        }
      }
      // Add into the current try array
      game.addColor(color);
    });
  }

  let $win = document.querySelector(".win");
  let $loose = document.querySelector(".loose");

  $validBtn = document.querySelector('.submit');
  $validBtn.addEventListener('click', function () {
    let validList = game.validateCombination();
    let validTotal = 0;
    for (let i = 0; i < validList.length; i++) {
      let j = i + 1;
      if (validList[i] === 2) {
        toggleColorIntoCorrector("correct-color", j, game);
        validTotal++;
      } else if (validList[i] === 1) {
        toggleColorIntoCorrector("correct-position", j, game);
      }
    }


    if (validTotal === gameSize) {
      $win.classList.toggle('show');
    } else if (game.currentTry > lines) {
      $loose.classList.toggle('show');
    }

    color = null;
  });

  $resetLastBtn = document.querySelector('.reset-last');
  $resetLastBtn.addEventListener('click', function () {
    game.removeColor();
    toggleColorIntoGame(color, game);
    if (game.userCombination.length > 0) {
      color = game.userCombination[game.userCombination.length - 1];
    } else {
      color = null;
    }
  });

  $restartBtn = document.querySelectorAll('.restart');
  for (let $restart of $restartBtn) {
    $restart.addEventListener('click', function () {
      game.resetGame();
      if ($win.classList.contains('show')) $win.classList.toggle('show');
      if ($loose.classList.contains('show')) $loose.classList.toggle('show');

      let $newRows = document.querySelectorAll('.game-row');
      for (let $newRow of $newRows) {
        $newRow.innerHTML = `<div class="col-game">
          <div class="hole"></div>
          <div class="hole"></div>
          <div class="hole"></div>
          <div class="hole"></div>
        </div>
        <div class="col-check">
          <div class="small-hole"></div>
          <div class="small-hole"></div>
          <div class="small-hole"></div>
          <div class="small-hole"></div>
        </div>`;
      }

      initRow();
    });
  }
});

/**
 * Set/Remove the name of the color into the class attribute
 * @param {string} color The color name
 */
function toggleColorIntoGame(color, game) {
  let tryNb = game.currentTry;
  let holeNb = game.userCombination.length + 1;
  let $hole = document.querySelector(`#row${tryNb} .hole:nth-child(${holeNb})`);
  $hole.classList.toggle(color);
}

/**
 * Set/Remove the name of the color into the class attribute
 * @param {string} color The color name
 */
function toggleColorIntoCorrector(color, iteration, game) {
  let tryNb = game.currentTry - 1;
  let $hole = document.querySelector(`#row${tryNb} + .col-check > .small-hole:nth-child(${iteration})`);
  $hole.classList.toggle(color);
}