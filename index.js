// function handleClick() {
//     fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//         .then(res => res.json())
//         .then(data => console.log(data))
// }

// document.getElementById("new-deck").addEventListener("click", handleClick)

// function callback() {
//     console.log("I finally ran!")
// }

// setTimeout(callback, 2000)

// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]

// function gimmeThePets(number) {
//     return person.hasPet
// }

// const peopleWithPets = people.filter(gimmeThePets)
// console.log(peopleWithPets)


/**
 * Challenge:
 *
 * Write your own `filter` function! Don't worry about adding it to the prototype of arrays or anything.
 * This function should take 2 parameters:
 * 1. The array you want to filter through, and
 * 2. A callback function
 *
 * Steps for filterArray function logic:
 * 1. Initialize a new, empty array which will be returned at the end of the `filterArray`s operations (Completed ✅)
 * 2. Loop through the array passed as the 1st parameter
 * 3. Inside the loop, call the callback function, passing the individual item you're currently looping over as the argument to your callback function
 * 4. If the callback function returns `true`, push the current item you're iterating on in the loop to the new array. If it returns `false`, don't push it to the array.
 * 5. When the loop is over, return the new array
 */

// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]

// function filterArray(array, callback) {
//     const resultingArray = []
//     // Write your filtering logic here
//     for (let item of array) {
//         const shouldBeIncluded = callback(item)
//         if (shouldBeIncluded) {
//             resultingArray.push(item)
//         }
//     }
//     return resultingArray
// }

// // item.hasPet

// function callback(element) {
//     if (element.hasPet) {
//         return true
//     }
// }
// const peopleWithPets = filterArray(people, callback)
// console.log(peopleWithPets)

// let testing = people.filter(item => item.hasPet === true)
// console.log(testing)

/**
 * Challenge: Use your filter array method!
 * Given the above `people` array, return a new array with only people where `hasPet` is true
 * Note: Remember that your callback function will be given the individual item in the array for a parameter
 */

/**
 * Challenge: method chaining!
 *
 * 1. Select the button in the DOM and add an event listener to it without saving the DOM element as a separate variable. I.e. "chain" the `addEventListener` on after your `getElementById()`(When clicked, log "Clicked" to the console)
 *    - I realize this might feel like busywork, but my intent will make sense soon
 *
 * 2. Upcoming...
 */

 /* 2. Given the array below, chain the `.filter` and `.map` array methods together to turn the array into an array of string email addresses of only the people in the array who voted. Log the array of email addresses to the console
 */


// document.getElementById('new-deck').addEventListener('click', function() {
//     console.log('Clicked')
// })


// const voters = [
//     {name: "Joe", email: "joe@joe.com", voted: true},
//     {name: "Jane", email: "jane@jane.com", voted: true},
//     {name: "Bo", email: "bo@bo.com", voted: false},
//     {name: "Bane", email: "bane@bane.com", voted: false}
// ]


// let chain = voters.filter(person => person.voted).map(person => person.email)
// console.log(chain)


// const promise = fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
// promise.then(res => res.json())

// fetch("https://apis.scrimba.com/bored/api/activity")
//     .then(function(res) {
//         return console.log('hey'), 1
//     })
//     .then(function(data) {
//         console.log(data)
//         return "World"
//     })
//     .then(function(another) {
//         console.log(another)
//     })


/**
 * Challenge:
 *
 * Try to determine which of the 2 cards is the "winner" (has higher value)
 * Aces are the card with the highest "score"
 *
 * In parts:
 *
 * 1. Create a function that takes 2 card objects as parameters,
 * `card1` and `card2`. These card objects have a property called
 * `value`, which can be any one of the following strings, in
 * order of rising "score":
 *
 * "2", "3", "4", "5", "6", "7", "8", "9",
 * "10", "JACK", "QUEEN", "KING", "ACE"
 *
 * I.e. "2" is the lowest score and "ACE" is the highest.
 *
 * The function should determine which of the 2 cards (`card1`
 * or `card2`) has the higher score, or if they have the same score.
 *
 * Log which card wins (or "It's a tie!"
 * if they're the same) to the console
 */

let war = document.getElementById('war')
let testing = document.getElementById('testing')

let newCard

let red = document.querySelector('.red')
let blue = document.querySelector('.blue')

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            newCard = data.deck_id
            console.log(newCard)
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)
document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${newCard}/draw/?count=2`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        red.innerHTML = `<img src="${data.cards[0].image}"/>`
        blue.innerHTML = `<img src="${data.cards[1].image}"/>`
        war.innerHTML = cardCheck2(data.cards[0].value, data.cards[1].value)
    })
})

let computerScore = 0
let myScore = 0

function cardCheck2(card1, card2) {
    let theCards = ['1', '2', '3', '4', '5', '6', '7', '8' ,'9' , '10', "JACK", "QUEEN", "KING", "ACE"];
    let firstCard = theCards.indexOf(card1) + 1
    let secondCard = theCards.indexOf(card2) + 1
    if(firstCard === secondCard) {
        return 'War'
    } else if (firstCard > secondCard) {
        myScore++
        return 'You Won!'
    } else if (firstCard < secondCard) {
        computerScore++
        return "Computer Won!"
    }
    testing.textContent = `My score is ${myScore}, computer score is ${computerScore}`
    console.log(`My score is ${myScore}, computer score is ${computerScore}`)
}

/**
 * Challenge:
 * 
 * Display the number of cards remaining in the deck on the page
 * Hint: Check the data that comes back when we draw 2 new cards
 * to see if there's anything helpful there for this task (😉)
*/

// let amin = {
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5,
//     6: 6,
//     7: 7,
//     8: 8,
//     9: 9,
//     10: 10,
//     JACK: 11,
//     QUEEN: 12,
//     KING: 13,
//     ACE: 14
// }

