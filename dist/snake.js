const pxToREM = 16;

const Snake = ( () => {

  const defaultSnake = [[5, 6], [5, 6], [5, 6], [5, 6], [5, 6]];
  let snake = [[5, 6], [5, 6], [5, 6], [5, 6], [5, 6]];
  let apple = [0, 0];
  let direction = 4;
  let score = 0;
  let isPlaying = false;
  let addSnakeSection = false;
  let FPS = 5;

  let gridBoxSize = 0;
  let gridBoxMargins = 2;
  let gridDimension = 10;
  let windowBorder = 2;
  let canvasBorder = 3;

  const gameContainer = document.getElementById('game-container');
  const gameWindow = document.getElementById('game-window');
  const gameCanvas = document.getElementById('game-canvas');
  const textInfo = document.getElementById('text-info');
  const scoreLabel = document.getElementById('score');
  const ctx = gameCanvas.getContext('2d');
  ctx.lineWidth = 0;
  const keyboardContainer = document.getElementById('keyboard-container');
  const gameContainerBorders = 2 * (2 * pxToREM);

  /*
  const trainImage = new Image();
  trainImage.src = window.location.href.split('?')[0] + "assets/boilermaker.png";
  console.log(trainImage.src);
  */

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

    window.addEventListener("resize", () => {
      resize();
    });
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

    ctx.beginPath();
    //ctx.drawImage(trainImage, apple[0] * gridBoxSize, apple[1] * gridBoxSize, gridBoxSize, gridBoxSize);
    ctx.fillStyle = 'red';
    ctx.rect(apple[0] * gridBoxSize + gridBoxMargins, apple[1] * gridBoxSize + gridBoxMargins, gridBoxSize - gridBoxMargins, gridBoxSize - gridBoxMargins);
    ctx.fill();

  }

  function takeInput() {
    document.getElementById('up').addEventListener('click', () => {
      if (direction != 2){
        direction = 0;
      }
      if (!isPlaying){isPlaying = true;}
    });
    document.getElementById('right').addEventListener('click', () => {
      if (direction != 3){
        direction = 1;
      }
      if (!isPlaying){isPlaying = true;}
    });
    document.getElementById('down').addEventListener('click', () => {
      if (direction != 0){
        direction = 2;
      }
      if (!isPlaying){isPlaying = true;}
    });
    document.getElementById('left').addEventListener('click', () => {
      if (direction != 1){
        direction = 3;
      }
      if (!isPlaying){isPlaying = true;}
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

    let newHead = [];
    switch(direction) {
      case 0:
        newHead[0] = snake[0][0];
        newHead[1] = snake[0][1] - 1;
        break;
      case 1:
        newHead[0] = snake[0][0] + 1;
        newHead[1] = snake[0][1];
        break;
      case 2:
        newHead[0] = snake[0][0];
        newHead[1] = snake[0][1] + 1;
        break;
      case 3:
        newHead[0] = snake[0][0] - 1;
        newHead[1] = snake[0][1];
        break;
    }

    if (newHead[0] < 0) {
      newHead[0] = gridDimension - 1;
    } else if (newHead[0] > gridDimension) {
      newHead[0] = 0;
    } else if (newHead[1] < 0) {
      newHead[1] = gridDimension - 1;
    } else if (newHead[1] > gridDimension) {
      newHead[1] = 0;
    }

    snake.unshift(newHead);

    if (!addSnakeSection) {
      snake.pop(snake.length - 1);
    } else {
      addSnakeSection = false;
    }
  }

  function ranIntoSelf() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
        return true;
      }
    }

    return false;
  }

  function ateApple() {
    if (snake[0][0] == apple[0] && snake[0][1] == apple[1]) {
      return true;
    }

    return false;
  }

  function randomizeApple() {

    let goodApple = false;

    while (!goodApple) {

      apple[0] = Math.floor(Math.random() * gridDimension);
      apple[1] = Math.floor(Math.random() * gridDimension);

      for (let i = 0; i < snake.length; i++) {
        if (apple[0] == snake[i][0] && apple[1] == snake[i][1]) {
          break;
        } else {
          goodApple = true;
          break;
        }
      }
    }
  }

  function setScore(newScore) {
    if (newScore != 0) {
      FPS++;
    } else {
      FPS = 5;
    }
    score = newScore;
    scoreLabel.innerHTML = "Score: "  + score;
  }

  function gameLogic() {

    if (isPlaying) {

      if (ranIntoSelf()) {

        isPlaying = false;
        direction = 4;
        snake = defaultSnake;
        randomizeApple();
        setScore(0);

      } else if (ateApple()) {

        setScore(score + 1);
        randomizeApple();
        addSnakeSection = true;

      }

    } else {



    }

  }

  function init() {

    function gameLoop() {
      if (isPlaying) {
        moveSnake();
        gameLogic();
        drawGame();
      }

      setTimeout(() => {
        gameLoop();
      }, Math.floor(1000 / FPS));
    }

    resize();
    takeInput();
    randomizeApple();
    drawGame();
    gameLoop();

  }

  return {
    init
  }

})();

const COLOR = window.location.href.split('?')[1];
document.getElementById('gameboy-body').style.backgroundColor = COLOR;

Snake.init();