const pxToREM = 16;

const Snake = ( () => {

  let snake = [];
  let board = [];

  const gameContainer = document.getElementById('game-container');
  const gameWindow = document.getElementById('game-window');
  const keyboardContainer = document.getElementById('keyboard-container');
  const gameContainerBorders = 2 * (2 * pxToREM);

  function resize() {
    keyboardContainer.style.width = keyboardContainer.offsetHeight + "px";

    let min = gameContainer.offsetHeight < gameContainer.offsetWidth ? gameContainer.offsetHeight : gameContainer.offsetWidth;

    let h = gameWindow.style.height = gameWindow.style.width = (min - gameContainerBorders) + "px";

    console.log(h);

    setTimeout(resize, 500);
  }

  return {
    resize
  }

})();

Snake.resize();