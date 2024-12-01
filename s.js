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
	
	