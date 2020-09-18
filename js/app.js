document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  const scoreDisplay = document.getElementById('score');
  const startBtn = document.getElementById('start-btn')
  const width = 10;

  // Create grid divs
  for (let i = 0; i < 200; i++) {
    const square = document.createElement("div");
    gameContainer.appendChild(square);
  }

  // Create taken divs 
  for (let i = 0; i < 10; i++) {
    const takenSquare = document.createElement("div");
    gameContainer.appendChild(takenSquare);
    takenSquare.className = "taken";
  } 
  // Get all the squares inside the game container
  let squares = Array.from(document.querySelectorAll('.game-container div'));

  // Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  // Tetromino position
  // let currentPosition = Math.floor(Math.random() * width);
  let currentPosition = 4;
  // let currentRotation = Math.floor(Math.random() * 4);
  let currentRotation = 0;
  
  // Randomly pick a Tetrormino and its rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  // Draw Tetromino
  function draw() {
    current.forEach( index => {
      squares[currentPosition + index].classList.add('tetromino');
    })
  }

  // Undraw Tetromino
  function undraw() {
    current.forEach( index => {
      squares[currentPosition + index].classList.remove('tetromino');
    })
  }

  // Make the tetromino move down every second
  let timerId = setInterval(moveDown, 1000);

  // Assign functions to keyCodes
  function control (e) {
    if(e.keyCode === 37 ||  e.keyCode === 65) {
      moveLeft();
    } else if (e.keyCode === 74) {
      // rotate left
      rotateLeft();
    } else if (e.keyCode === 76) {
      // rotate right
      rotateRight();
    } else if (e.keyCode === 32 ) {
      moveDown();
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      moveRight()
    }
  }

  document.addEventListener('keydown', control);

  // Move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Move the tetromino left, unless it's at the edge or there's a blockage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some( index => (currentPosition + index) % width === 0 );

    if (!isAtLeftEdge) currentPosition -= 1;
    if (current.some( index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  }

  // Move the tetromino right, unless it's at the edge or there's a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some( index => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some( index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }

    draw();
  }

  // Rotate Right
  function rotateRight() {
    undraw();
    currentRotation ++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    };
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  // Rotate Left

  function rotateLeft() {
    undraw();
    currentRotation --;
    if (currentRotation === -1) {
      currentRotation = current.length -1;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  // Freeze function
  function freeze() {
    if (current.some( index => squares[currentPosition + index + width].classList.contains('taken')) ) {
      current.forEach( index => squares[currentPosition + index].classList.add('taken'));

      // Start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }
});