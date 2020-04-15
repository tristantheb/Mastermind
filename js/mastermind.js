function Mastermind(gameMaxSize, gameMaxTry) {
  /**
   * @property {number} gameSize The number of choise max needed
   */
  var gameSize = gameMaxSize;

  /**
   * @property {number} currentTry The current try
   */
  this.currentTry = 1;

  /**
   * @property {number} maxTry The maximum try can be used before the "Game over"
   */
  var maxTry = gameMaxTry;

  /**
   * @constant {array} VALID_COLORS All the colors can be used in the game
   */
  const VALID_COLORS = ["red", "green", "blue", "yellow"];
  this.VALID_COLORS = VALID_COLORS;

  /**
   * @property {array} secretCombination The combination of the game
   */
  var secretCombination = createCombination(gameSize);

  /**
   * @property {array} userCombination The combination of the user
   * @public
   */
  this.userCombination = [];

  /**
   * @constant {string} WELL_PLACED The color is on correct position
   * @private
   */
  const WELL_PLACED = 2;

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
    if (this.currentTry > maxTry) return;
    /** FIXME: Defensive programming needed !
     * TODO: Block unauthorized colors
     */
    if (this.userCombination.length === gameSize) return;
    this.userCombination.push(color);
  };

  /**
   * Remove the last color
   * @public
   * @method removeColor
   */
  this.removeColor = function removeColor() {
    this.userCombination.pop();
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
    if (this.userCombination.length !== gameSize) return;
    let validator = [];
    for (let i = 0; i < this.userCombination.length; i++) {
      validator.push(validateColor(this.userCombination[i], i));
    }
    // Update game status
    this.userCombination = [];
    this.currentTry++;
    // Sort the array and reverse alphabetic content to have: valid colors, good positions, invalid colors ("valid", "position", "invalid")
    //validator.sort().reverse();
    return validator;
  };

  /**
   * Reset the game values and regenera the secret combination
   * @method resetGame
   * @public
   */
  this.resetGame = function resetGame() {
    this.currentTry = 1;
    this.userCombination = [];
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
      return WELL_PLACED;
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
      combination.push(VALID_COLORS[j]);
    }
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
