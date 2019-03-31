const wordGuessContainer = document.getElementById("guessed-word");
const guessedLettersContainer = document.getElementById("guessed-letter");
const newGameButton = document.getElementById("new-game-button");
const guessLetterForm = document.getElementById("guess-form");
const guessButton = document.getElementsByClassName("btn btn-outline-success");
const startingAmt = 7;
let remAmt;
let correctGuess = [];
let letter = "";
let guessedLetters = [];
let guessRem = document.getElementById('remaining-guesses');
const wordsToGuess = [
  "banana",
  "pineapple",
  "lemon",
  "apple",
  "orange",
  "pear",
  "peach",
  "coconut",
  "durian"
];
let chosenWord = "";
//declared a bunch of stuff needed for later

function initialWordSetup(word) {
  let spaces = word.split("").map(function (letter) {
    return "_";
  });
  wordGuessContainer.innerHTML = spaces.join(" ");
}

function startNewGame() {
  guessLetterForm.classList.remove("d-none");
  wordGuessContainer.innerHTML = "";
  guessedLettersContainer.innerHTML = "";
  chosenWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
  initialWordSetup(chosenWord);
  //displaying starting amount of guesses
  guessRem.innerHTML = startingAmt;
  //using remAmt for further deduction without changing or affecting the starting amount
  remAmt = startingAmt;
  //resetting the guessed letters array
  guessedLetters.length = 0;
  //reenabling the guess/sumbit button if it was previously disabled from the previous round
  document.getElementById('submit-button').disabled = false;
}

newGameButton.onclick = function () {
  startNewGame();
};

//to determine if the letter was guessed or not 
//not the best way to write this because of the "reverse" conditions, can be confusing
function pastGuesses(input) {
  //if the guessed letters does NOT include the input run code
  if (!guessedLetters.includes(input)) {
    //array needs to use push to be added
    guessedLetters.push(input);
    //creating the li tag for displaying the guessed letters
    let liTag = document.createElement('li');
    //need to create it as text node and not simple "" text
    let lettersToBeAdded = document.createTextNode(letter);
    //combining the text into the <li> tag
    liTag.appendChild(lettersToBeAdded);
    //temporary adding the code to the html for this round, will reset after refresh or when new round starts
    document.getElementById('guessed-letter').appendChild(liTag);
    //returning false for the if checker, because this here is primarily to accept new guesses
    return false;
  } else {
    //when returning ture, it means the input/letter has been found within the guessed letters, hence "rejected"
    return true;
  }
}

//input checking function
function guessChecker(input) {
  //needed this to compare before after
  let beforeGuessing = [];
  //this for loop is to update any previous changes from guessing
  for (let x = 0; x < correctGuess.length; x++) {
    //since it is array, we cant just use assigning method, .push is needed
    beforeGuessing.push(correctGuess[x]);
  }
  //this for loop is to check the new input letter against the chosen word and then adding it as update to the correct guesses
  for (let i = 0; i < chosenWord.length; i++) {
    if (input == chosenWord[i]) {
      //.toUpperCase for display purposes
      correctGuess[i] = input.toUpperCase();
    }
  }
  //need to be converted to string for comparison
  let stringCorrectGuess = correctGuess.toString();
  let stringOldWord = beforeGuessing.toString();
//to determine if the letter was guessed or not AND 
//to reduce the remaining amount of guesses if nothing has changed, meaning it was a fail guess
  if (pastGuesses(input) == true) {
    window.alert('Letter has been guessed, guess again!');
  } else if (stringOldWord == stringCorrectGuess) {
    remAmt = remAmt - 1;
  }
}

// Guess/submit button on form
guessLetterForm.onsubmit = function () {
  //important to avoid refreshing the page
  event.preventDefault();
  //line to receive the input text
  letter = document.getElementById("guess-letter").value;
  //converting the guessed words from "_ _ _ _" to an array without " "
  correctGuess = wordGuessContainer.innerHTML.split(" ");
  //checking the input against the word-to-guess
  guessChecker(letter);
  //rejoining the letters with " " for display purpose
  wordGuessContainer.innerHTML = correctGuess.join(" ");
  //resetting the text input area
  document.getElementById("guess-letter").value = "";
  //displaying the remaining amount of guesses amount
  guessRem.innerHTML = remAmt;
  //winning alert & losing alert, along with disabling the submit button
  if (!correctGuess.includes("_") && remAmt > 0) {
    window.alert("You have won the game!");
    document.getElementById('submit-button').disabled = true;
  } else if (remAmt <= 0) {
    window.alert("You've lost! Please try again.");
    document.getElementById('submit-button').disabled = true;
  }
}