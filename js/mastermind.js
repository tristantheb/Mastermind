function Mastermind() {
  var gameSize = 4;
  /**
   * @property {array} validColors All the colors can be used in the game
   */
  const validColors = ["red", "green", "blue", "yellow"];
  /**
   * @property {array} secretCombination The combination of the game
   */
  var secretCombination = createCombination(gameSize);
  var userCombination = [];

  /**
   * Add the color to the user combination array
   * @public
   * @method addColor
   * @param {string} color The choosen color
   */
  this.addColor = function addColor(color) {
    /** FIXME: Defensive programming needed !
     * Block unauthorized colors
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
   * Check the player combination
   * @public
   * @method validateCombination
   * @param {array} combination The combination of colors
   * 
   * @returns {array} The list of colors changed with validation values
   */
  this.validateCombination = function validateCombination() {
    if (userCombination.length !== gameSize) return;
    let validator = [];
    for (let i = 0; i < userCombination.length; i++) {
      validator.push(validateColor(userCombination[i], i));
    }
    userCombination = [];
    // Sort the array and reverse alphabetic content to have: valid colors, good positions, invalid colors ("valid", "position", "invalid")
    validator.sort().reverse();
    return validator;
  };

  /**
   * Check if the color is on the valid position, or present in the secret combination or if she's invalid
   * @method validateColor
   * @param {string} color The color who search to validate
   * @param {number} position The position of this color
   * 
   * @returns {string} The value of the color (valid, position, invalid)
   */
  function validateColor(color, position) {
    if (color === secretCombination[position]) {
      return 'valid';
    } else {
      for (let i = 0; i < secretCombination.length; i++) {
        if (color === secretCombination[i]) return 'position';
      }
    }
    return 'invalid';
  }

  /**
   * @method createCombination
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

  function randomChoise(number) {
    return Math.floor(Math.random() * Math.max(number));
  }
}
