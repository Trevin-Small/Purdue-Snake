const pxToREM = 16;

const Snake = ( () => {

  let snake = [[0,0], [1,0], [2,0], [2,1]];
  let apple = [];
  let gridBoxSize = 0;
  let gridBoxMargins = 3;
  let gridDimension = 16;
  let windowBorder = 2;
  let canvasBorder = 4;

  const gameContainer = document.getElementById('game-container');
  const gameWindow = document.getElementById('game-window');
  const gameCanvas = document.getElementById('game-canvas');
  const ctx = gameCanvas.getContext('2d');
  const keyboardContainer = document.getElementById('keyboard-container');
  const gameContainerBorders = 2 * (2 * pxToREM);
  const FPS = 20;

  function resize() {
    keyboardContainer.style.width = keyboardContainer.offsetHeight + "px";

    let minDimension = gameContainer.offsetHeight < gameContainer.offsetWidth ? gameContainer.offsetHeight : gameContainer.offsetWidth;

    let maxDimension = (minDimension - gameContainerBorders);

    let windowDimension = (Math.floor(maxDimension / gridDimension) * gridDimension) + (windowBorder * 2);

    gameWindow.style.height = gameWindow.style.width = windowDimension +  "px";

    gameContainer.style.height = (windowDimension + gameContainerBorders) + "px";

    gameCanvas.width = gameCanvas.height = (windowDimension - canvasBorder * 2);

    console.log(windowDimension);

    gridBoxSize = gameCanvas.width / gridDimension;

    window.onresize = resize;
  }

  function drawGame() {

    /*
    ctx.fillStyle = 'none';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    */

    for (let i = 0; i < snake.length; i++) {
      // outlined square X: 50, Y: 35, width/height 50
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.rect(snake[i][0] * gridBoxSize + gridBoxMargins, snake[i][1] * gridBoxSize + gridBoxMargins, gridBoxSize - gridBoxMargins, gridBoxSize - gridBoxMargins);
      ctx.fill();
      ctx.stroke();
    }

    setTimeout(drawGame, 1000 / FPS);

  }

  function gameStart() {
    drawGame();
  }

  return {
    resize,
    gameStart
  }

})();

Snake.resize();
Snake.gameStart();