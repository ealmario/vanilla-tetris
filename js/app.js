document.addEventListener('DOMContentLoaded', () => {
  //code here
  const gameContainer = document.getElementById('gameContainer');
  for (let i = 0; i < 200; i++) {
    const square = document.createElement("div");
    gameContainer.appendChild(square);
  }
});