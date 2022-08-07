const pxToREM = 16;

const Snake = ( () => {

  let snake = [[8, 9], [8, 9], [8, 9], [8, 9]];
  let apple = [];
  let direction = 0;
  let score = 0;

  let gridBoxSize = 0;
  let gridBoxMargins = 2;
  let gridDimension = 16;
  let windowBorder = 2;
  let canvasBorder = 3;

  const gameContainer = document.getElementById('game-container');
  const gameWindow = document.getElementById('game-window');
  const gameCanvas = document.getElementById('game-canvas');
  const textInfo = document.getElementById('text-info');
  const ctx = gameCanvas.getContext('2d');
  ctx.lineWidth = 0;
  const keyboardContainer = document.getElementById('keyboard-container');
  const gameContainerBorders = 2 * (2 * pxToREM);
  const FPS = 4;

  function resize() {
    keyboardContainer.style.width = keyboardContainer.offsetHeight + "px";

    let minDimension = gameContainer.offsetHeight < gameContainer.offsetWidth ? gameContainer.offsetHeight : gameContainer.offsetWidth;

    let maxDimension = (minDimension - gameContainerBorders);

    let windowDimension = maxDimension + (windowBorder * 2);

    gameWindow.style.height = gameWindow.style.width = windowDimension +  "px";

    gameContainer.style.height = (windowDimension + gameContainerBorders) + "px";

    gameCanvas.width = gameCanvas.height = (windowDimension - canvasBorder * 2);

    gridBoxSize = gameCanvas.width / gridDimension;

    textInfo.style.width = windowDimension - 12 + "px";

    window.onresize = resize;
  }

  function drawGame() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    for (let i = 0; i < snake.length; i++) {
      // outlined square X: 50, Y: 35, width/height 50
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.rect(snake[i][0] * gridBoxSize + gridBoxMargins, snake[i][1] * gridBoxSize + gridBoxMargins, gridBoxSize - gridBoxMargins, gridBoxSize - gridBoxMargins);
      ctx.fill();
    }

  }

  function takeInput() {
    document.getElementById('up').addEventListener('click', () => {
      if (direction != 2){
        direction = 0;
      }
    });
    document.getElementById('right').addEventListener('click', () => {
      if (direction != 3){
        direction = 1;
      }
    });
    document.getElementById('down').addEventListener('click', () => {
      if (direction != 0){
        direction = 2;
      }
    });
    document.getElementById('left').addEventListener('click', () => {
      if (direction != 1){
        direction = 3;
      }
    });

    document.addEventListener('keydown', (event) => {
      console.log(event.code);
      if (event.code == '37'){
        direction == 3;
      } else if (event.code == '38'){
        direction == 0;
      } else if (event.code == '39'){
        direction == 1;
      } else if (event.code == '40'){
        direction == 2;
      }
    });


  }

  function moveSnake() {

    let tailIndex = snake.length - 1;
    switch(direction) {
      case 0:
        snake[tailIndex][1] = snake[0][1] - 1;
        snake[tailIndex][0] = snake[0][0];
        break;
      case 1:
        snake[tailIndex][0] = snake[0][0] + 1;
        snake[tailIndex][1] = snake[0][1];
        break;
      case 2:
        snake[tailIndex][1] = snake[0][1] + 1;
        snake[tailIndex][0] = snake[0][0];
        break;
      case 3:
        snake[tailIndex][0] = snake[0][0] - 1;
        snake[tailIndex][1] = snake[0][1];
        break;
    }

    if (snake[tailIndex][0] < 0) {
      snake[tailIndex][0] = gridDimension - 1;
    } else if (snake[tailIndex][0] > gridDimension) {
      snake[tailIndex][0] = 0;
    } else if (snake[tailIndex][1] < 0) {
      snake[tailIndex][1] = gridDimension - 1;
    } else if (snake[tailIndex][1] > gridDimension) {
      snake[tailIndex][1] = 0;
    }

    snake.unshift(snake.pop(snake.length - 1));
  }

  function init() {

    function gameLoop() {
      moveSnake();
      drawGame();

      setTimeout(() => {
        gameLoop();
      }, 1000 / FPS);
    }

    resize();
    gameLoop();
    takeInput();

  }

  return {
    init
  }

})();

Snake.init();