document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('grid-container');
  const miniGridContainer = document.getElementById('minigrid-container');
  const scoreDisplay = document.getElementById('score');
  const startBtn = document.getElementById('start-btn');
  const width = 10;
  let timerId;
  let nextRandom = 0;

  // Create grid divs
  for (let i = 0; i < 201; i++) {
    const square = document.createElement("div");
    gridContainer.appendChild(square);
  }

  // Create taken divs 
  for (let i = 0; i < 11; i++) {
    const takenSquare = document.createElement("div");
    gridContainer.appendChild(takenSquare);
    takenSquare.className = "taken";
  }

  // Create divs for mini-grid
  for (let i = 0; i < 17; i++) {
    const miniGridSquares = document.createElement("div");
    miniGridContainer.appendChild(miniGridSquares);
  }
  
  // Get all the squares inside the grid container
  let squares = Array.from(document.querySelectorAll('.grid-container div'));

  // Show up-next tetromino in mini-grid
  const displaySquares = document.querySelectorAll('.minigrid-container div');
  const displayWidth = 4;
  let displayIndex = 0;

  // Tetrominos without rotation
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
    [0, 1, displayWidth, displayWidth+1] // oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetronimo
  ]

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
  let currentPosition = 4;
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
  timerId = setInterval(moveDown, 1000);

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

  // Display the shape in the mini-grid display
  function displayShape() {
    // Remove class 'tetromino' from the mini-grid
    displaySquares.forEach( square => {
      square.classList.remove('tetromino');
    });
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
  }

  // Freeze function
  function freeze() {
    if (current.some( index => squares[currentPosition + index + width].classList.contains('taken')) ) {
      current.forEach( index => squares[currentPosition + index].classList.add('taken'));

      // Start a new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
    }
  }

  // Move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    displayShape();
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
});