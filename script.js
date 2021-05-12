//HTML elements;
const gameDIV = document.querySelector(".game");

const matchFadeOutDIV = document.createElement("div");
matchFadeOutDIV.setAttribute("class", "match fadeOut");
document.body.appendChild(matchFadeOutDIV);
gameDIV.appendChild(matchFadeOutDIV);

const chooseAnOptionH2 = document.createElement("h2");
chooseAnOptionH2.setAttribute("class", "winner");
chooseAnOptionH2.textContent = "Choose an option";
document.body.appendChild(chooseAnOptionH2);
matchFadeOutDIV.appendChild(chooseAnOptionH2);

const handsDIV = document.createElement("div");
handsDIV.setAttribute("class", "hands");
handsDIV.innerHTML = '<img class="player-hand" src="./assets/rock.png" alt="" />    <img class="computer-hand" src="./assets/rock.png" alt="" />';
document.body.appendChild(handsDIV);
matchFadeOutDIV.appendChild(handsDIV);

const optionsDIV = document.createElement("div");
optionsDIV.setAttribute("class", "options");
optionsDIV.innerHTML = '<button class="rock">rock</button>  <button class="paper">paper</button>  <button class="scissors">scissors</button>';
document.body.appendChild(optionsDIV);
matchFadeOutDIV.appendChild(optionsDIV);
//End here;


const game = () => {
    let pScore = 0;
    let cScore = 0;

    //Start the Game;
    const startGame = () => {
        const startBTN = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");
        const score = document.querySelector(".score");

        score.classList.add("fadeOut");

        startBTN.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
            score.classList.add("fadeIn");
            return score.classList.remove("fadeOut");
        });
        return;
    };

    //Play Match;
    const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");

        hands.forEach(hand => {
            hand.addEventListener("animationend", function () {
                this.style.animation = "";
            });
        });

        //Computer Options;
        const computerOptions = ["rock", "paper", "scissors"];

        options.forEach(element => {
            element.addEventListener("click", function () {

                //Hide all buttons when clicked
                optionsDIV.classList.add("hidden");
                chooseAnOptionH2.classList.add("hidden");

                //Start animation with hands closed
                playerHand.src = `./assets/rock.png`;
                computerHand.src = `./assets/rock.png`;

                //Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                setTimeout(() => {
                    //Here is where we call compare hands
                    compareHands(this.textContent, computerChoice);

                    //Update Images
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;

                    setTimeout(function () {
                        //Buttons and text visible
                        optionsDIV.classList.remove("hidden");
                        chooseAnOptionH2.classList.remove("hidden");
                        visible();
                    }, 50);
                    return;
                }, 900);

                //Animation
                playerHand.style.animation = "shakePlayer 1s ease";
                computerHand.style.animation = "shakeComputer 1s ease";
            });
        });
        //return css transition visible
        function visible() {
            optionsDIV.classList.add("visible");
            chooseAnOptionH2.classList.add("visible");
            setTimeout(() => {
                optionsDIV.classList.remove("visible");
                chooseAnOptionH2.classList.remove("visible");
            }, 160);
            return;
        };
    };


    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

        if (cScore >= 10) {
            computerWinner();
        };

        if (pScore >= 10) {
            playerWinner();
        };
    };

    const compareHands = (playerChoice, computerChoice) => {

        //Update Text;
        const winner = document.querySelector(".winner");

        //Checking for a tie;
        if (playerChoice === computerChoice) {
            winner.textContent = "It's a tie";
            return;
        };

        //Check for Rock;
        if (playerChoice === "rock") {
            if (computerChoice === "scissors") {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            };
        };

        //Check for Paper;
        if (playerChoice === "paper") {
            if (computerChoice === "scissors") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            };
        };

        //Check for Scissors;
        if (playerChoice === "scissors") {
            if (computerChoice === "rock") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            };
        };
        return;
    };

    const restart = () => {
        //change score
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

        cScore = 0;
        pScore = 0;
        playerScore.innerHTML = 0;
        computerScore.innerHTML = 0;

        //Hands closed
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        playerHand.src = `./assets/rock.png`;
        computerHand.src = `./assets/rock.png`;

        //Default text
        chooseAnOptionH2.textContent = "Choose an option";
        return;
    };

    const computerWinner = () => {
        const modalOverlayError = document.createElement("div");
        modalOverlayError.setAttribute("class", "modal-overlay-error");
        gameDIV.appendChild(modalOverlayError);

        const modalError = document.createElement("div");
        modalError.setAttribute("class", "modal-error");
        modalOverlayError.appendChild(modalError);

        let modalMessage = document.createElement("div");
        modalMessage.setAttribute("class", "modal-message");
        modalError.appendChild(modalMessage);

        const closeBTN = document.createElement("span");
        closeBTN.setAttribute("class", "closebtn");
        closeBTN.innerHTML = "&times;";
        modalMessage.appendChild(closeBTN);

        let ErrorMessage = document.createElement("p");
        ErrorMessage.setAttribute("id", "error-message");
        ErrorMessage.textContent = "You lose!";
        modalMessage.appendChild(ErrorMessage);

        let ErrorMessage2 = document.createElement("p");
        ErrorMessage2.setAttribute("id", "error-message2");
        ErrorMessage2.textContent = "Computer wins!";
        modalMessage.appendChild(ErrorMessage2);


        modalOverlayError.classList.add('show-error'); //Show error

        //Close alert
        closeBTN.addEventListener("click", () => {
            modalError.classList.add("hide");
            setTimeout(function () {
                modalError.classList.remove("hide");
                restart();
                modalOverlayError.classList.remove('show-error');
                return modalOverlayError.parentNode.removeChild(modalOverlayError); //Will stop to spam the alert in html 
            }, 800);
            return;
        });

        //able to close alert with ESC KEY;
        window.document.addEventListener("keydown", e => {
            if (e.keyCode === 27) {
                modalError.classList.add("hide");
                setTimeout(function () {
                    modalError.classList.remove("hide");
                    restart();
                    modalOverlayError.classList.remove('show-error');
                    return modalOverlayError.parentNode.removeChild(modalOverlayError); //Will stop to spam the alert in html 
                }, 900);
                return;
            };
        });
        return;
    };

    const playerWinner = () => {
        const modalOverlayWinner = document.createElement("div");
        modalOverlayWinner.setAttribute("class", "modal-overlay-winner");
        gameDIV.appendChild(modalOverlayWinner);

        const modalWinner = document.createElement("div");
        modalWinner.setAttribute("class", "modal-winner");
        modalOverlayWinner.appendChild(modalWinner);

        let modalMessage = document.createElement("div");
        modalMessage.setAttribute("class", "modal-message");
        modalWinner.appendChild(modalMessage);

        const closeBTN = document.createElement("span");
        closeBTN.setAttribute("class", "closebtn");
        closeBTN.innerHTML = "&times;";
        modalMessage.appendChild(closeBTN);

        let WinnerMessage = document.createElement("p");
        WinnerMessage.setAttribute("id", "winner-message");
        WinnerMessage.textContent = "Way to go!";
        modalMessage.appendChild(WinnerMessage);

        let WinnerMessage2 = document.createElement("p");
        WinnerMessage2.setAttribute("id", "winner-message2");
        WinnerMessage2.textContent = "Player wins!";
        modalMessage.appendChild(WinnerMessage2);

        modalOverlayWinner.classList.add('show-winner'); //Show winner

        //Close alert
        closeBTN.addEventListener("click", () => {
            modalWinner.classList.add("hide");
            setTimeout(function () {
                modalWinner.classList.remove("hide");
                restart();
                modalOverlayWinner.classList.remove('show-winner');
                return modalOverlayWinner.parentNode.removeChild(modalOverlayWinner); //Will stop to spam the alert in html 
            }, 800);
            return;
        });

        //able to close alert with ESC KEY;
        window.document.addEventListener("keydown", (e) => {
            if (!e) {
                return e = event;
            };
            if (e.keyCode == 27) {
                modalWinner.classList.add("hide");
                setTimeout(function () {
                    modalWinner.classList.remove("hide");
                    restart();
                    modalOverlayWinner.classList.remove('show-winner');
                    return modalOverlayWinner.parentNode.removeChild(modalOverlayWinner); //Will stop to spam the alert in html 
                }, 800);
                return;
            };
        });
        return;
    };

  
    startGame();
    playMatch();
};
game();

console.log("ಠ_ಠ");
console.log("(๑✪ᆺ✪๑)");
