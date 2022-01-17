const FRONT = "card_front"
const BACK = "card_back"

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react']

let cards = null
let countRound = 1
let card1 = ''
let card2 = ''
let foundPairCards = 0

startGame();

function startGame() {
    cards = createCardsFromTechs(techs)
    shuffleCards(cards)
    initializeCards(cards)
}

function createCardsFromTechs(techs) {
    let cards = [];
    for (let tech of techs) {
        cards.push(createPairFromTechs(tech)) // primeiras 10 cartas
        cards.push(createPairFromTechs(tech)) // pares das 10 
    }
    return cards.flat() // a função acima retorno um array de arrays
    // com .flat() deixamos tudo a nivel do primeiro array apenas
}

function createPairFromTechs(tech) {
    return [{
        icon: tech,
    }]
}

function shuffleCards(cards) {
    let currentIndex = cards.length
    let randomIndex = 0

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")
    cards.forEach((card) => {
        gameBoard.innerHTML += `
        <div class="card" data-icon="${card.icon}" id="${card.id}" onclick="flipCard(this)">
            <div class="card_front">
                <img class="icon" src="./images/${card.icon}.png">
            </div>
            <div class="card_back">
                &lt/&gt
            </div>
        </div>
        `
    })
}

function flipCard(cardSelected) {
    cardSelected.classList.add("flip")
    if (card1 == cardSelected || card2 == cardSelected) {
        alert("Você não pode selecionar a mesma carta!")
    }
    if (countRound == 1) {
        card1 = cardSelected
        sessionStorage.setItem("card1", cardSelected.getAttribute("data-icon"))
        countRound = 2
    }
    else {
        card2 = cardSelected
        sessionStorage.setItem("card2", cardSelected.getAttribute("data-icon"))
        countRound = 1
        checkMatch()
    }

}

function checkMatch() {
    if (sessionStorage.getItem("card1") != sessionStorage.getItem("card2")) {
        setTimeout(() => {
            card1.classList.remove("flip")
            card2.classList.remove("flip")
            card1 = ''
            card2 = ''
        }, 1000)
    } else {
        card1.removeAttribute("onClick")
        card2.removeAttribute("onClick")
        foundPairCards++
        if (foundPairCards == 10){
            let gameOverLayer = document.getElementById("gameOver")
            gameOverLayer.style.display = "flex"
        }
    }
}