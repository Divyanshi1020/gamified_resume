'use strict';

let gameStart, gameSpeed, gameArea, gameAreaContext;
let snake = [], snakeDirection = '';
let playerScore = 0, snakeFood = {}, timer;
let gameAreaWidth = 400, gameAreaHeight = 400, cellWidth = 20;
let resumePopup, shownMilestones = [];


function initElement() {
  gameStart = document.getElementById('gameStart');
  gameSpeed = document.getElementById('gameSpeed');
  gameArea = document.getElementById('gameArea');
  resumePopup = document.getElementById('resumePopup');

  gameAreaContext = gameArea.getContext('2d');
  gameArea.width = gameAreaWidth;
  gameArea.height = gameAreaHeight;
}

function createFood() {
  snakeFood = {
    x: Math.floor(Math.random() * (gameAreaWidth / cellWidth)),
    y: Math.floor(Math.random() * (gameAreaHeight / cellWidth))
  };
}

function createSquare(x, y) {
  gameAreaContext.fillStyle = '#00fff2';
  gameAreaContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
}

function drawFood() {
  gameAreaContext.fillStyle = '#ff4081';
  gameAreaContext.fillRect(snakeFood.x * cellWidth, snakeFood.y * cellWidth, cellWidth, cellWidth);
}

function control(x, y, array) {
  return array.some(cell => cell.x === x && cell.y === y);
}

function updateScoreDisplay() {
  document.getElementById('scoreBoard').textContent = `Score: ${playerScore}`;
}

function createGameArea() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  gameAreaContext.fillStyle = 'rgba(0,0,0,0.2)';
  gameAreaContext.fillRect(0, 0, gameAreaWidth, gameAreaHeight);

  if (snakeDirection === 'right') snakeX++;
  else if (snakeDirection === 'left') snakeX--;
  else if (snakeDirection === 'down') snakeY++;
  else if (snakeDirection === 'up') snakeY--;

  // Collision detection
  if (snakeX < 0 || snakeY < 0 || snakeX >= gameAreaWidth / cellWidth || snakeY >= gameAreaHeight / cellWidth || control(snakeX, snakeY, snake)) {
    clearInterval(timer);
    gameStart.disabled = false;
    alert(`Game Over! Final Score: ${playerScore}`);
    return;
  }

  // Eat food
  if (snakeX === snakeFood.x && snakeY === snakeFood.y) {
    playerScore++;
    updateScoreDisplay();
    checkMilestone(playerScore);
    createFood();
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  for (let i = 0; i < snake.length; i++) {
    createSquare(snake[i].x, snake[i].y);
  }

  drawFood();
}

function startGame() {
  snake = [{ x: 5, y: 5 }];
  playerScore = 0;
  snakeDirection = 'right';
  shownMilestones = [];
  updateScoreDisplay();
  createFood();

  clearInterval(timer);
  const speed = Math.max(1, Math.min(9, parseInt(gameSpeed.value)));
  timer = setInterval(createGameArea, 200 - (speed * 15));
}

function onStartGame() {
  this.disabled = true;
  startGame();
}

function changeDirection(e) {
  const key = e.which;
  if (key === 37 && snakeDirection !== 'right') snakeDirection = 'left';
  else if (key === 38 && snakeDirection !== 'down') snakeDirection = 'up';
  else if (key === 39 && snakeDirection !== 'left') snakeDirection = 'right';
  else if (key === 40 && snakeDirection !== 'up') snakeDirection = 'down';
}

function checkMilestone(score) {
  const milestones = [
    { score: 5, id: "about", text: "👋 Hi I am Divyanshi Singh a m otivated MSc Informatics student at Delhi University, actively developing skills in Software Development, Cloud and DevOps technologies. Eager to gain real-world experience and deepen knowledge of AWS and DevOps practices. Familiar with java, Python, Linux, Git, GitHub, and computer networking, and committed to continuous learning in cloud technologies." },

    { score: 10, id: "education", text : "🎓 Education : 10th S.D.Global School CBSE - 94.8% , 12th S.D.Global School CBSE - 94% , B.Sc (Hons) Computer Science , University of Delhi- 70% MSc Informatics, University of Delhi. "},

    { score: 15, id: "skills", text: "💼 Skills: AWS | SQL | Linux | Java | Python | React | Node.js" },

    { score: 20, id: "projects", text: "🚀 Projects: Gamified Resume, NextUp" },

    { score: 25, id: "contact", text: "📞 Contact: divyanshisingh1020@gmail.com | LinkedIn: https://www.linkedin.com/in/divyanshi-singh-563420208/ | GitHub: https://github.com/Divyanshi1020" }
  ];

  milestones.forEach(m => {
    if (score >= m.score && !shownMilestones.includes(m.score)) {
      shownMilestones.push(m.score);
      const section = document.getElementById(m.id);
      section.textContent = m.text;
      section.classList.add('visible');
      section.classList.remove('hidden');
    }
  });
}

function initEvent() {
  gameStart.addEventListener('click', onStartGame);
  window.addEventListener('keydown', changeDirection);
}

function init() {
  initElement();
  initEvent();
}

window.addEventListener('DOMContentLoaded', init);
