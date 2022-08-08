const pxToREM = 16;

const Snake = ( () => {

  const defaultSnake = [[5, 5], [5, 6], [5, 6], [5, 6], [5, 6]];
  let snake = [[5, 5], [5, 6], [5, 6], [5, 6], [5, 6]];
  let apple = [0, 0];
  let direction = 4;
  let prevDirectionMoved = 4;
  let score = 0;
  let isPlaying = true;
  let isHidden = false;
  let addSnakeSection = false;
  let FPS = 5;

  let gridBoxSize = 0;
  let gridBoxMargins = 2;
  let gridDimension = 10;
  let windowBorder = 2;
  let canvasBorder = 5;

  let color = window.location.href.split('?')[1];
  console.log("Color: " + color);
  if (color == null || color == undefined || color.length != 7) {
    color = "#28b5b3";
  }
  document.getElementById('gameboy-body').style.backgroundColor = color;

  const gameContainer = document.getElementById('game-container');
  const gameWindow = document.getElementById('game-window');
  const gameCanvas = document.getElementById('game-canvas');
  const scoreLabel = document.getElementById('score');
  const ctx = gameCanvas.getContext('2d');
  ctx.lineWidth = 0;
  const keyboardContainer = document.getElementById('keyboard-container');
  const gameContainerBorders = 2 * (2 * pxToREM);

  function resize() {
    keyboardContainer.style.width = keyboardContainer.offsetHeight + "px";

    let minDimension = gameContainer.offsetHeight < gameContainer.offsetWidth ? gameContainer.offsetHeight : gameContainer.offsetWidth;

    let maxDimension = (minDimension - gameContainerBorders);

    let windowDimension = maxDimension + (windowBorder * 2);

    gameWindow.style.height = gameWindow.style.width = windowDimension +  "px";

    gameContainer.style.height = (windowDimension + gameContainerBorders) + "px";

    gameCanvas.width = gameCanvas.height = (windowDimension - canvasBorder * 2);

    gridBoxSize = gameCanvas.width / gridDimension;

    window.addEventListener("resize", () => {
      resize();
    });
  }

  function drawGame() {

    ctx.beginPath();
    if (isHidden) {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'black';
    }
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    for (let i = snake.length - 1; i >= 0; i--) {
      // outlined square X: 50, Y: 35, width/height 50
      ctx.beginPath();
      if (i != 0) {
        ctx.fillStyle = 'white';
      } else {
        ctx.fillStyle = color;
      }
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
      if (prevDirectionMoved != 2){
        direction = 0;
      }
    });
    document.getElementById('right').addEventListener('click', () => {
      if (prevDirectionMoved != 3){
        direction = 1;
      }
    });
    document.getElementById('down').addEventListener('click', () => {
      if (prevDirectionMoved != 0 && direction != 4){
        direction = 2;
      }
    });
    document.getElementById('left').addEventListener('click', () => {
      if (prevDirectionMoved != 1){
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

    if (!isPlaying) return;

    let newHead = [];
    switch(direction) {
      case 0:
        newHead[0] = snake[0][0];
        newHead[1] = snake[0][1] - 1;
        prevDirectionMoved = 0;
        break;
      case 1:
        newHead[0] = snake[0][0] + 1;
        newHead[1] = snake[0][1];
        prevDirectionMoved = 1;
        break;
      case 2:
        newHead[0] = snake[0][0];
        newHead[1] = snake[0][1] + 1;
        prevDirectionMoved = 2;
        break;
      case 3:
        newHead[0] = snake[0][0] - 1;
        newHead[1] = snake[0][1];
        prevDirectionMoved = 3;
        break;
      case 4:
        return;
    }

    if (newHead[0] < 0) {
      newHead[0] = gridDimension - 1;
    } else if (newHead[0] > gridDimension - 1) {
      newHead[0] = 0;
    } else if (newHead[1] < 0) {
      newHead[1] = gridDimension - 1;
    } else if (newHead[1] > gridDimension - 1) {
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
          return;
        }
      }
    }
  }

  function setScore(newScore) {
    if (newScore != 0) {
      FPS += 0.25;
    } else {
      FPS = 5;
    }
    score = newScore;
    scoreLabel.innerHTML = "Score: "  + score;
  }

  function gameLoop() {

    if (isPlaying) {

      moveSnake();

      if (ranIntoSelf()) {

        direction = 4;
        isPlaying = false;
        isHidden = true;
        addSnakeSection = false;
        randomizeApple();
        setTimeout(() => {
          setScore(0);
          isPlaying = true;
          snake = defaultSnake.slice();
          isHidden = false;
        }, 2000);


      } else if (ateApple()) {

        setScore(score + 1);
        randomizeApple();
        addSnakeSection = true;

      }


    }

    drawGame();

    setTimeout(gameLoop, 1000 / FPS);
  }

  function init() {

    resize();
    setScore(0);
    takeInput();
    randomizeApple();
    gameLoop();

  }

  return {
    init
  }

})();

Snake.init();