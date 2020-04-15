function Mastermind(gameMaxTry) {
  /**
   * @property {number} gameSize The number of choise max needed
   */
  var gameSize = 4;

  /**
   * @property {number} currentTry The current try
   */
  var currentTry = 1;

  /**
   * @property {number} maxTry The maximum try can be used before the "Game over"
   */
  var maxTry = gameMaxTry;

  /**
   * @property {array} validColors All the colors can be used in the game
   */
  const validColors = ["red", "green", "blue", "yellow"];

  /**
   * @property {array} secretCombination The combination of the game
   */
  var secretCombination = createCombination(gameSize);

  /**
   * @property {array} userCombination The combination of the user
   */
  var userCombination = [];

  /**
   * @constant {string} CORRECT The color is on correct position
   * @private
   */
  const CORRECT = 2;

  /**
   * @constant {string} MISPLACED The color is present on the game but it's not the good placement
   * @private
   */
  const MISPLACED = 1;

  /**
   * @constant {string} INVALID The color is invalid
   * @private
   */
  const INVALID = 0;

  /**
   * Add the color to the user combination array
   * @public
   * @method addColor
   * @param {string} color The choosen color
   */
  this.addColor = function addColor(color) {
    /** FIXME: Defensive programming needed !
     * TODO: Block unauthorized colors
     */
    if (userCombination.length === gameSize) return;
    userCombination.push(color);
    // TEMP: Remove after test
    console.log("[DEV] Actual combination", userCombination);
  };

  /**
   * Remove the last color
   * @public
   * @method removeColor
   */
  this.removeColor = function removeColor() {
    userCombination.pop();
  };

  /**
   * Check the player combination and return the status of the choosen colors
   * @public
   * @method validateCombination
   * @param {array} combination The combination of colors
   * 
   * @returns {array} The list of colors changed with validation values
   * @private
   */
  this.validateCombination = function validateCombination() {
    // TEMP: Console log need to be removed
    console.log('[DEV] → Current try', currentTry);
    if (userCombination.length !== gameSize) return;
    let validator = [];
    for (let i = 0; i < userCombination.length; i++) {
      validator.push(validateColor(userCombination[i], i));
    }
    userCombination = [];
    currentTry++;
    // Sort the array and reverse alphabetic content to have: valid colors, good positions, invalid colors ("valid", "position", "invalid")
    validator.sort().reverse();
    // TEMP: Console log need to be removed
    console.log('[DEV] ← Current try', currentTry);
    return validator;
  };

  /**
   * Reset the game values and regenera the secret combination
   * @method resetGame
   * @public
   */
  this.resetGame = function resetGame() {
    currentTry = 1;
    userCombination = [];
    secretCombination = createCombination(gameSize);
  };

  /**
   * Check if the color is on the valid position, or present in the secret combination or if she's invalid
   * @method validateColor
   * @param {string} color The color who search to validate
   * @param {number} position The position of this color
   * 
   * @returns {string} The value of the color (valid, position, invalid)
   * @private
   */
  function validateColor(color, position) {
    if (color === secretCombination[position]) {
      return CORRECT;
    } else {
      for (let i = 0; i < secretCombination.length; i++) {
        if (color === secretCombination[i]) return MISPLACED;
      }
    }
    return INVALID;
  }

  /**
   * Create an combination of color, this is secret and the good answer of the game
   * @method createCombination
   * @private
   */
  function createCombination(maxColor) {
    let combination = [];
    for (let i = 0; i < maxColor; i++) {
      let j = randomChoise(maxColor);
      combination.push(validColors[j]);
    }
    // TEMP: Retire this wen finished
    console.info("[DEV]", combination);
    return combination;
  }

  /**
   * Create an random number between 1 and the max number choosed
   * @param {number} number The maximal number of the colors present in game
   * @private
   */
  function randomChoise(number) {
    return Math.floor(Math.random() * Math.max(number));
  }
}
