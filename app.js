document.addEventListener('DOMContentLoaded', () => {

// Card options

const cardArray = [
    {
        name: 'pikachu',
        img: './Images/pikachu.png'
    },
    {
        name: 'pikachu',
        img: './Images/pikachu.png'
    },
    {
        name: 'bulbasaur',
        img: './Images/bulbasaur.png'
    },
    {
        name: 'bulbasaur',
        img: './Images/bulbasaur.png'
    },
    {
        name: 'butterfree',
        img: './Images/butterfree.png'
    },
    {
        name: 'butterfree',
        img: './Images/butterfree.png'
    },
    {
        name: 'charmander',
        img: './Images/charmander.png'
    },
    {
        name: 'charmander',
        img: 'Images/charmander.png'
    },
    {
        name: 'mewtwo',
        img: './Images/mewtwo.png'
    },
    {
        name: 'mewtwo',
        img: './Images/mewtwo.png'
    },
    {
        name: 'squirtle',
        img: './Images/squirtle.png'
    },
    {
        name: 'squirtle',
        img: './Images/squirtle.png'
    }
]


// declare variables
const board = document.querySelector('.game-board');
const displayScore = document.querySelector('#score');
const displayGameOver = document.querySelector('.stats');
const displayTimer = document.querySelector('#count');
let chosenCards =[];
let chosenCardsId = [];
let matches = [];
let timeLeft = 60;


// Set score to 0 at beginning of the game
displayScore.textContent = matches.length;

// Randomise card positions
cardArray.sort(() => 0.5 - Math.random())

// Create game board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img')
        card.setAttribute('src', './Images/pokeball.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        board.appendChild(card)
    }
};

createBoard()


// Flip cards
function flipCard() {
    let cardId = this.getAttribute('data-id')
    
    // checks if card has already been selected
    if(chosenCardsId.includes(cardId)) {
        chosenCardsId=[cardId]
    // checks if card is already in matches array
    } else if (matches.includes(cardArray[cardId].name)) {
       chosenCardsId = []
    // if card hasn't already been selected and isn't already in the matches array - proceed to flipping card
    } else {
        chosenCards.push(cardArray[cardId].name)
        chosenCardsId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
    }

    if (chosenCards.length === 2) {
        setTimeout(checkForMatch, 300)  
    } 
};

// Check for matched cards
function checkForMatch() {
    let cards = document.querySelectorAll('img')
    const cardOneId = chosenCardsId[0]
    const cardTwoId = chosenCardsId[1]
    if (chosenCards[0] === chosenCards[1]) {
        cards[cardOneId].setAttribute('src', './Images/blank.png')
        cards[cardTwoId].setAttribute('src', './Images/blank.png')
        matches.push(chosenCards[0])
    } else {
        cards[cardOneId].setAttribute('src', './Images/pokeball.png')
        cards[cardTwoId].setAttribute('src', './Images/pokeball.png')
    }

    chosenCards = []
    chosenCardsId = []

    displayScore.textContent = matches.length
         if (matches.length === cardArray.length/2) {
          gameWin()
        }
}

 let timer = setInterval(function(){
    timeLeft--;
    displayTimer.textContent = timeLeft;
    if(timeLeft <= 0) {
        clearInterval(timer);
        gameOver();
    }
},1000);


// If all pairs are found within the time limit
function gameWin() {
    displayGameOver.textContent = `Congratulations! You found all ${matches.length} pairs!`
}

//If timer runs out before all pairs are found
function gameOver() { 
    if (matches.length === 1) {
        displayGameOver.textContent = `Time's up! You found ${matches.length} pair!`
    } else {
        displayGameOver.textContent = `Time's up! You found ${matches.length} pairs!`
    }
}


})
