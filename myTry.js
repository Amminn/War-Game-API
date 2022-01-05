const newDeck = document.getElementById('new-deck')
const drawCard = document.getElementById('draw-cards')
const remaining = document.getElementById('remaining')
const war = document.getElementById('war')
const disComputerScore = document.getElementById('computerScore')
const disMyScore = document.getElementById('myScore')
const computerCard = document.querySelector('.computer-card')
const myCard = document.querySelector('.my-card')

let newCard
let myScore = 0
let computerScore = 0

async function newDeckFunction() {
    const resp = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await resp.json() 
            console.log(data)
            remaining.textContent = `remainig is ${data.remaining}`
            drawCard.disabled = false
            newCard = data.deck_id
}

// excuting newDeckFunction function when click on the top button
newDeck.addEventListener('click', newDeckFunction)


// excuting function when click on the top button
drawCard.addEventListener('click', async () => {

    // sending the deck_id to the API and receiving...
    const resp = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${newCard}/draw/?count=2`)
    const data = await resp.json()

        // checking if the cards run out
        if (data.remaining === 0) {
            drawCard.disabled = true
            remaining.textContent = `remainig is ${data.remaining} nothing left`
            if (myScore > computerScore) {
                war.textContent = "You won the game"
            } else if (myScore < computerScore) {
                war.textContent = "You lost the game"
            } else if (myScore === computerScore) {
                war.textContent = "It is a tie"
            }
        }

    // rendring the data 
    remaining.textContent = `remainig is ${data.remaining}`
    myCard.innerHTML = `<img src="${data.cards[0].image}" alt="my score">`
    computerCard.innerHTML = `<img src="${data.cards[1].image}" alt="computer card">`
    checkWinner(data.cards[0].value, data.cards[1].value)
    disMyScore.innerHTML = `Your score is ${myScore}`
    disComputerScore.innerHTML = `Computer score is ${computerScore}`
})

function checkWinner(card1, card2) {
    // adding dicitionary of the cards
    let CardDictionary = ['1', '2', '3', '4', '5', '6', '7', '8' ,'9' , '10', "JACK", "QUEEN", "KING", "ACE"]

    // checking the the value of the cards
    let firstCard = CardDictionary.indexOf(card1) + 1
    let secondCard = CardDictionary.indexOf(card2) + 1

    // checking for the winner card
    if (firstCard === secondCard) {
        war.textContent = "it is tie"
    } else if (firstCard > secondCard) {
        war.textContent = "You won"
        return myScore++
    } else if (firstCard < secondCard) {
        war.textContent = "You lost"
        return computerScore++
    }
}

