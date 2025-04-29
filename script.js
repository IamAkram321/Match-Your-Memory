const categories = {
    fruits: ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥭', '🍍'],
    emojis: ['😀', '😂', '😎', '😍', '😜', '🤩', '🥳', '🤔'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    planets: ['🌍', '🌕', '🪐', '🌟', '☀️', '🌑', '🌌', '🛸']
};
let selectedCards = [];
let matchedPairs = 0;
let score = 0;
let timer;

function startGame(category) {
    document.querySelector('.landing-page').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    generateCards(categories[category]);
    startTimer();
}

function generateCards(items) {
    let gameGrid = document.getElementById('cardGrid');
    gameGrid.innerHTML = '';
    let cards = [...items, ...items].sort(() => Math.random() - 0.5);
    
    cards.forEach((item, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.item = item;
        card.onclick = () => flipCard(card);
        gameGrid.appendChild(card);
    });
}

function flipCard(card) {
    if (selectedCards.length < 2 && !card.classList.contains('matched')) {
        card.textContent = card.dataset.item;
        selectedCards.push(card);
        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    let [card1, card2] = selectedCards;

    if (card1 === card2) {
        setTimeout(() => {
            card1.textContent = '';
            card1.dataset.flipped = 'false';
            selectedCards = [];
        }, 500);
        return;
    }

    if (card1.dataset.item === card2.dataset.item) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        score += 10;
        document.getElementById('score').textContent = score;
        if (matchedPairs === 8) {
            clearInterval(timer);
            setTimeout(() => alert('You Win!'), 300);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    selectedCards = [];
}

function startTimer() {
    let timeLeft = 45;
    document.getElementById('timer').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert('Game Over!');
            document.getElementById('gameContainer').style.display = 'none';
            document.querySelector('.landing-page').style.display = 'block';
        }
    }, 1000);
}