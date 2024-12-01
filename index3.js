    // JavaScript Code

    const leftLine = document.querySelector('.line.left');
    const rightLine = document.querySelector('.line.right');
    const buttons = document.querySelectorAll('.option');
    const container = document.querySelector('.container');
    const settingsButton = document.getElementById("settings-button");
    const exitButton = document.getElementById("exit-button");
    const settingsMenu = document.getElementById("settings-menu");
    const mainTitle = document.querySelector(".main-title");
    const optionsDiv = document.querySelector(".options");
    const aboutButton = document.getElementById("about-button");
    const aboutMenu = document.getElementById("about-menu");
    const exitAboutButton = document.getElementById("exit-about-button");
    const developerButton = document.getElementById("developer-button");
    const developerMenu = document.getElementById("developer-menu");
    const exitDeveloperButton = document.getElementById("exit-developer-button");
    const tryNowButton = document.getElementById("try-now"); 
    const tryNowMenu = document.getElementById("trynow-menu");
    const exitTryNowButton = document.getElementById("exit-trynow-button");

    // Function to reset styles to normal
    function resetStyles() {
      mainTitle.classList.remove('move-up');
      optionsDiv.classList.remove('move-up');
      leftLine.classList.remove('move-up');
      rightLine.classList.remove('move-up');
      settingsMenu.classList.remove('active');
      aboutMenu.classList.remove('active');
      developerMenu.classList.remove('active');
      tryNowMenu.classList.remove('active');

      // Show all buttons again
      buttons.forEach(button => {
        button.style.display = "inline-block";
        button.classList.remove('large');
      });
    }

    // Event listeners for buttons and game selection

    settingsButton.addEventListener('click', () => {
      mainTitle.classList.add('move-up');
      optionsDiv.classList.add('move-up');
      leftLine.classList.add('move-up');
      rightLine.classList.add('move-up');
      settingsMenu.classList.add('active');
      settingsButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== settingsButton) {
          button.style.display = "none";
        }
      });
    });

    exitButton.addEventListener('click', resetStyles);
    aboutButton.addEventListener('click', () => {
      resetStyles();
      aboutMenu.classList.add('active');
      aboutButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== aboutButton) {
          button.style.display = "none";
        }
      });
    });

    exitAboutButton.addEventListener('click', resetStyles);

    developerButton.addEventListener('click', () => {
      resetStyles();
      developerMenu.classList.add('active');
      developerButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== developerButton) {
          button.style.display = "none";
        }
      });
    });

    exitDeveloperButton.addEventListener('click', resetStyles);

    tryNowButton.addEventListener('click', () => {
      resetStyles();
      mainTitle.classList.add('move-up');
      optionsDiv.classList.add('move-up');
      leftLine.classList.add('move-up');
      rightLine.classList.add('move-up');
      tryNowMenu.classList.add('active');
      tryNowButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== tryNowButton) {
          button.style.display = "none";
        }
      });
    });

    exitTryNowButton.addEventListener('click', resetStyles);

    // Handle theme selection
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const theme = e.target.value;
        document.body.className = ""; // Reset theme classes
        document.body.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
      });
    });

    // Handle background gradient customization
    const bgColor1 = document.getElementById("bg-color1");
    const bgColor2 = document.getElementById("bg-color2");

    [bgColor1, bgColor2].forEach((input) => {
      input.addEventListener("input", () => {
        document.body.style.background = `linear-gradient(180deg, ${bgColor1.value}, ${bgColor2.value})`;
      });
    });

    // Handle word animation color customization
    const wordColor1 = document.getElementById("word-color1");
    const wordColor2 = document.getElementById("word-color2");

    [wordColor1, wordColor2].forEach((input) => {
      input.addEventListener("input", () => {
        mainTitle.style.background = `linear-gradient(90deg, ${wordColor1.value}, ${wordColor2.value})`;
        mainTitle.style.backgroundSize = "400%";
        mainTitle.style.webkitBackgroundClip = "text";
        mainTitle.style.webkitTextFillColor = "transparent";
      });
    });
	
	// Get the game list and the game container
const gameListItems = document.querySelectorAll('.try-now-content .game-list li');
const gameContainer = document.getElementById('gameContainer');

// Sample game content to show in the game container
const gameContent = {
  'snake-eater': `
    <p>Welcome to Snake Eater! Try to eat as much as you can without hitting the walls.</p>
    <button class="start-button" id="start-snake-eater">Start Game</button>
  `,
  'tic-tac-toe': `
    <p>Welcome to Tic Tac Toe! Challenge a friend or play against the computer.</p>
    <button class="start-button" id="start-tic-tac-toe">Start Game</button>
  `,
  'galaxy-shooting': `
    <p>Welcome to Galaxy Shooting! Shoot the asteroids and avoid getting hit.</p>
    <button class="start-button" id="start-galaxy-shooting">Start Game</button>
  `,
  'type-speed': `
    <p>Welcome to Type Speed! Type the words as fast as you can.</p>
    <button class="start-button" id="start-type-speed">Start Game</button>
  `,
  'fly-bird': `
    <p>Welcome to Fly Bird! Help the bird fly through the pipes.</p>
    <button class="start-button" id="start-fly-bird">Start Game</button>
  `,
};

// Function to create and initialize the Snake Eater game
function startSnakeEater() {
  gameContainer.innerHTML = `
    <h2>Snake Eater</h2>
    <p>Use the arrow keys to move the snake and eat the food. Don't hit the walls or yourself!</p>
    <div id="gameContainerWrapper" style="position: relative; display: inline-block;">
	<div id="gameOverMessage" style="display: none; font-size: 24px; color: red; margin-top: 20px; text-align: center;">Game Over</div>
      <canvas id="snakeCanvas" width="600" height="350" style="border: 2px solid white;"></canvas>
      <div id="scoreDisplay" style="position: absolute; top: 0; right: -80px; width: 70px; text-align: center; color: white; font-size: 18px; background-color: rgba(0, 0, 0, 0.5); padding: 5px; border-radius: 5px;">Score: 0</div>
    </div>
      `;

  const canvas = document.getElementById('snakeCanvas');
  const ctx = canvas.getContext('2d');
  const gameOverMessage = document.getElementById('gameOverMessage');
  const scoreDisplay = document.getElementById('scoreDisplay');

  const snakeSize = 20;
  const canvasSize = 600;
  let snake = [{ x: 160, y: 160 }];
  let direction = 'right';
  let food = { x: 60, y: 60 };
  let score = 0;
  let gameInterval;

  function drawSnake() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
  }

  function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
  }

  function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
      case 'up':
        head.y -= snakeSize;
        break;
      case 'down':
        head.y += snakeSize;
        break;
      case 'left':
        head.x -= snakeSize;
        break;
      case 'right':
        head.x += snakeSize;
        break;
    }

    // Check for collision with the wall
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
      endGame();
      return;
    }

    // Check for collision with itself
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      endGame();
      return;
    }

    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      placeNewFood();
    } else {
      snake.pop();
    }
  }

  function placeNewFood() {
    const x = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
    const y = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
    food = { x, y };
  }

  function endGame() {
    clearInterval(gameInterval);
    gameOverMessage.style.display = 'block';
    scoreDisplay.textContent = `Final Score: ${score}`;
  }

  // Handle keyboard input
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'down') direction = 'up';
        break;
      case 'ArrowDown':
        if (direction !== 'up') direction = 'down';
        break;
      case 'ArrowLeft':
        if (direction !== 'right') direction = 'left';
        break;
      case 'ArrowRight':
        if (direction !== 'left') direction = 'right';
        break;
    }
  });

  // Start the game loop
  gameInterval = setInterval(() => {
    moveSnake();
    drawSnake();
    drawFood();
  }, 150);
}

// Add the Snake Eater button event listener
const startSnakeButton = document.getElementById('start-snake-eater');
if (startSnakeButton) {
  startSnakeButton.addEventListener('click', startSnakeEater);
}
// Function to create and initialize the Tic Tac Toe game
function startTicTacToe() {
  gameContainer.innerHTML = `
    <h2>Tic Tac Toe</h2>
    <p>Game logic for Tic Tac Toe goes here. Play against a friend!</p>
    <div style="display: flex; gap: 20px;">
      <div id="ticTacToeBoard" style="display: grid; grid-template-columns: repeat(3, 150px); gap: 10px;">
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
        <button class="tic-tac-toe-cell"></button>
      </div>
      <div id="winningConditions" style="width: 300px; padding: 10px; border: 2px solid black;">
        <h3>Win Counts</h3>
        <p id="xWinCount" style="color: blue; font-weight: bold;">Player X wins: 0</p>
        <p id="oWinCount" style="color: red; font-weight: bold;">Player O wins: 0</p>
        <p id="drawCount" style="color: gray; font-weight: bold;">Draws: 0</p>
      </div>
    </div>
    <div id="gameStatus" style="margin-top: 10px; font-size: 18px;"></div>
  `;

  const cells = document.querySelectorAll('.tic-tac-toe-cell');
  const xWinCountEl = document.getElementById('xWinCount');
  const oWinCountEl = document.getElementById('oWinCount');
  const drawCountEl = document.getElementById('drawCount');
  let currentPlayer = 'X';
  let gameActive = true;
  let xWinCount = 0;
  let oWinCount = 0;
  let drawCount = 0;

  // Add styles to the cell buttons for improved appearance
  document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
    cell.style.width = '150px';
    cell.style.height = '100px';
    cell.style.fontSize = '2rem';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.border = '2px solid black';
    cell.style.cursor = 'pointer';
    cell.style.backgroundColor = '#f0f0f0';
    cell.style.transition = 'background-color 0.3s';
  });

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]            // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameStatus.style.color = 'green';
        gameActive = false;

        // Update win counts
        if (currentPlayer === 'X') {
          xWinCount++;
          xWinCountEl.textContent = `Player X wins: ${xWinCount}`;
        } else {
          oWinCount++;
          oWinCountEl.textContent = `Player O wins: ${oWinCount}`;
        }

        // Automatically reset after 2 seconds
        setTimeout(() => {
          resetBoard();
        }, 2000);

        return;
      }
    }

    // Check for a draw
    if ([...cells].every(cell => cell.textContent !== '')) {
      gameStatus.textContent = "It's a draw!";
      gameStatus.style.color = 'orange';
      gameActive = false;
      drawCount++;
      drawCountEl.textContent = `Draws: ${drawCount}`;

      // Automatically reset after 2 seconds
      setTimeout(() => {
        resetBoard();
      }, 2000);
    }
  }

  function resetBoard() {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    gameStatus.style.color = 'black';
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (gameActive && cell.textContent === '') {
        cell.textContent = currentPlayer;
        checkWinner();
        if (gameActive) {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          gameStatus.textContent = `Player ${currentPlayer}'s turn`;
          gameStatus.style.color = 'black';
        }
      }
    });
  });

  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}
function startGalaxyShooting() {
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = `
    <h2>Galaxy Shooting</h2>
    <p>Game logic for Galaxy Shooting goes here. Shoot asteroids and avoid getting hit!</p>
    <canvas id="galaxyCanvas" width="400" height="300" style="border: 2px solid white;"></canvas>
  `;

  const canvas = document.getElementById('galaxyCanvas');
  const ctx = canvas.getContext('2d');

  // Game state
  let spaceship = { x: 180, y: 260, width: 20, height: 20 };
  let bullets = [];
  let asteroids = [];
  let enemyJets = [];
  let enemyBullets = [];
  let destroyedCount = 0; // Counter for destroyed asteroids
  let enemyDestroyedCount = 0; // Counter for destroyed enemy jets
  let gameInterval;
  let gameOver = false;
  let splashEffects = []; // Array to hold splash effects

  // Key state tracking
  let keysPressed = {
    ArrowLeft: false,
    ArrowRight: false,
  };

  // Draw the spaceship (triangle)
  function drawSpaceship() {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(spaceship.x, spaceship.y + spaceship.height);
    ctx.lineTo(spaceship.x + spaceship.width / 2, spaceship.y);
    ctx.lineTo(spaceship.x + spaceship.width, spaceship.y + spaceship.height);
    ctx.closePath();
    ctx.fill();
  }

  // Draw enemy jets (blue triangles)
  function drawEnemyJets() {
    ctx.fillStyle = 'blue';
    for (let jet of enemyJets) {
      ctx.beginPath();
      ctx.moveTo(jet.x, jet.y + jet.height);
      ctx.lineTo(jet.x + jet.width / 2, jet.y);
      ctx.lineTo(jet.x + jet.width, jet.y + jet.height);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Draw enemy bullets (blue rectangles)
  function drawEnemyBullets() {
    ctx.fillStyle = 'blue';
    for (let bullet of enemyBullets) {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
  }

  // Draw bullets
  function drawBullets() {
    ctx.fillStyle = 'red';
    for (let bullet of bullets) {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
  }

  // Draw asteroids
  function drawAsteroids() {
    ctx.fillStyle = 'gray';
    for (let asteroid of asteroids) {
      ctx.beginPath();
      ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Draw splash effects
  function drawSplashEffects() {
    for (let i = splashEffects.length - 1; i >= 0; i--) {
      const effect = splashEffects[i];
      const gradient = ctx.createRadialGradient(effect.x, effect.y, 0, effect.x, effect.y, effect.radius);
      gradient.addColorStop(0, 'rgba(255, 165, 0, 1)'); // Orange at the center
      gradient.addColorStop(1, 'rgba(255, 165, 0, 0)'); // Transparent at the edge

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
      ctx.fill();

      // Update splash properties for animation
      effect.radius += 0.5; // Expand radius for animation
      effect.opacity -= 0.02; // Fade out the splash

      // Remove the splash effect when it becomes transparent
      if (effect.opacity <= 0) {
        splashEffects.splice(i, 1);
      }
    }
  }

  // Draw destroyed counts
  function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('Asteroids Destroyed: ' + destroyedCount, 10, 20);
    ctx.fillText('Enemy Jets Destroyed: ' + enemyDestroyedCount, 10, 40);
  }

  // Move spaceship left
  function moveLeft() {
    if (spaceship.x > 0) {
      spaceship.x -= 5;
    }
  }

  // Move spaceship right
  function moveRight() {
    if (spaceship.x + spaceship.width < canvas.width) {
      spaceship.x += 5;
    }
  }

  // Fire a bullet
  function fireBullet() {
    bullets.push({ x: spaceship.x + spaceship.width / 2 - 2, y: spaceship.y, width: 4, height: 10 });
  }

  // Generate random asteroids
  function generateAsteroids() {
    if (Math.random() < 0.02) {
      let x = Math.random() * (canvas.width - 20);
      let y = 0;
      let radius = Math.random() * 15 + 10;
      asteroids.push({ x, y, radius });
    }
  }

  // Generate enemy jets
  function generateEnemyJets() {
    if (Math.random() < 0.01) {
      let x = Math.random() * (canvas.width - 30);
      let y = Math.random() * (canvas.height / 2);
      enemyJets.push({ x, y, width: 20, height: 20, speed: 2 });
    }
  }

  // Generate enemy bullets
  function generateEnemyBullets() {
    for (let jet of enemyJets) {
      if (Math.random() < 0.02) {
        enemyBullets.push({ x: jet.x + jet.width / 2 - 2, y: jet.y + jet.height, width: 4, height: 10 });
      }
    }
  }

  // Update the position of bullets and check for collisions
  function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= 5;
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }
  }

  // Update the position of enemy bullets and check for collisions with the spaceship
  function updateEnemyBullets() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      enemyBullets[i].y += 5;
      if (enemyBullets[i].y > canvas.height) {
        enemyBullets.splice(i, 1);
      }
      // Check for collision with the spaceship
      let dx = spaceship.x + spaceship.width / 2 - enemyBullets[i].x;
      let dy = spaceship.y + spaceship.height / 2 - enemyBullets[i].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 2 + Math.min(spaceship.width, spaceship.height) / 2) {
        gameOver = true;
        clearInterval(gameInterval);
        alert('Game Over! The spaceship was hit by an enemy bullet.');
        break;
      }
    }
  }

  // Update the position of asteroids and check for collisions
  function updateAsteroids() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
      asteroids[i].y += 2;
      if (asteroids[i].y > canvas.height) {
        asteroids.splice(i, 1);
      }
    }
  }

  // Update enemy jets' movement
  function updateEnemyJets() {
    for (let jet of enemyJets) {
      jet.x += jet.speed;
      if (jet.x > canvas.width || jet.x < 0) {
        jet.speed *= -1; // Reverse direction when hitting the edge
      }
    }
  }

  // Check for collisions between bullets and asteroids
  function checkCollisions() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        let dx = bullets[j].x - asteroids[i].x;
        let dy = bullets[j].y - asteroids[i].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < asteroids[i].radius + 2) {
          asteroids.splice(i, 1);
          bullets.splice(j, 1);
          destroyedCount++; // Increment destroyed counter
          splashEffects.push({ x: asteroids[i].x, y: asteroids[i].y, radius: 2, opacity: 1 });
          break;
        }
      }
    }
  }

  // Check for collisions between bullets and enemy jets
  function checkEnemyCollisions() {
    for (let i = enemyJets.length - 1; i >= 0; i--) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        let dx = bullets[j].x - enemyJets[i].x;
        let dy = bullets[j].y - enemyJets[i].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < enemyJets[i].width / 2 + 2) {
          splashEffects.push({ x: enemyJets[i].x + enemyJets[i].width / 2, y: enemyJets[i].y + enemyJets[i].height / 2, radius: 2, opacity: 1 });
          enemyJets.splice(i, 1);
          bullets.splice(j, 1);
          enemyDestroyedCount++; // Increment enemy destroyed counter
          break;
        }
      }
    }
  }

  // Check for collisions between enemy bullets and the spaceship
  function checkEnemyBulletCollisions() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      let dx = spaceship.x + spaceship.width / 2 - enemyBullets[i].x;
      let dy = spaceship.y + spaceship.height / 2 - enemyBullets[i].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 2 + Math.min(spaceship.width, spaceship.height) / 2) {
        gameOver = true;
        clearInterval(gameInterval);
        alert('Game Over! The spaceship was hit by an enemy bullet.');
        break;
      }
    }
  }

  // Game loop
  function gameLoop() {
    if (gameOver) return; // Stop the loop if the game is over

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBullets();
    drawEnemyJets();
    drawEnemyBullets();
    drawAsteroids();
    drawScore();
    drawSplashEffects(); // Draw splash effects
    updateBullets();
    updateEnemyBullets();
    updateAsteroids();
    updateEnemyJets();
    checkCollisions();
    checkEnemyCollisions();
    checkEnemyBulletCollisions();
    generateAsteroids();
    generateEnemyJets();
    generateEnemyBullets();

    if (keysPressed.ArrowLeft) {
      moveLeft();
    }
    if (keysPressed.ArrowRight) {
      moveRight();
    }
  }

  // Event listeners for controls
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      keysPressed.ArrowLeft = true;
    }
    if (e.key === 'ArrowRight') {
      keysPressed.ArrowRight = true;
    }
    if (e.key === ' ') {
      fireBullet();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
      keysPressed.ArrowLeft = false;
    }
    if (e.key === 'ArrowRight') {
      keysPressed.ArrowRight = false;
    }
  });

  // Start the game loop
  gameInterval = setInterval(gameLoop, 30);
  alert("Galaxy Shooting game started!");
}



// Function to create and initialize the Type Speed game
function startTypeSpeed() {
  gameContainer.innerHTML = `
    <h2>Type Speed</h2>
    <p>Game logic for Type Speed goes here. Type the words as fast as you can!</p>
    <input type="text" id="typeSpeedInput" placeholder="Start typing...">
  `;
  // Add actual game logic here
  alert("Type Speed game started!");
}

// Function to create and initialize the Fly Bird game
function startFlyBird() {
  gameContainer.innerHTML = `
    <h2>Fly Bird</h2>
    <p>Game logic for Fly Bird goes here. Help the bird fly through the pipes!</p>
    <canvas id="flyBirdCanvas" width="400" height="400" style="border: 1px solid black;"></canvas>
  `;
  // Add actual game logic here
  const canvas = document.getElementById('flyBirdCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'yellow';
  ctx.fillRect(50, 50, 10, 10);
  alert("Fly Bird game started!");
}

// Add click event listeners to each game list item
gameListItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    const gameName = e.target.getAttribute('data-game');

    if (gameContent[gameName]) {
      // Display the selected game content in the game container
      gameContainer.innerHTML = gameContent[gameName];

      // Add event listener to the start button for the specific game
      const startButton = document.querySelector(`#start-${gameName}`);
      if (startButton) {
        startButton.addEventListener('click', () => {
          switch (gameName) {
            case 'snake-eater':
              startSnakeEater();
              break;
            case 'tic-tac-toe':
              startTicTacToe();
              break;
            case 'galaxy-shooting':
              startGalaxyShooting();
              break;
            case 'type-speed':
              startTypeSpeed();
              break;
            case 'fly-bird':
              startFlyBird();
              break;
            default:
              alert('Game not implemented yet!');
          }
        });
      }
    } else {
      gameContainer.innerHTML = '<p>Game content not found!</p>';
    }
  });
});
