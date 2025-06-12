const cardImages = [
 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',         
  'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg',     
  'https://upload.wikimedia.org/wikipedia/commons/b/bb/Cherry_Stella444.jpg',  // Cherry
  'https://upload.wikimedia.org/wikipedia/commons/3/36/Lemon.jpg',             
  'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg', // Orange
  'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg',      
  'https://upload.wikimedia.org/wikipedia/commons/1/10/Strawberries.jpg',      // Strawberry
  'https://upload.wikimedia.org/wikipedia/commons/3/36/Kiwi_aka.jpg',          // Kiwi
  'https://upload.wikimedia.org/wikipedia/commons/5/5b/Pineapple_and_cross_section.jpg', // Pineapple
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Watermelon_cross_BNC.jpg' // Watermelon

];

const backImage =  'the-secret-logo-seal.webp'
let cards = [];
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const board = document.getElementById('gameBoard');
  board.innerHTML = '';
  matchedCards = 0;
  flippedCards = [];

  cards = [...cardImages, ...cardImages];
  shuffle(cards);

  cards.forEach((src) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = src;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"><img src="${src}" alt="front" /></div>
        <div class="card-back"><img src="${backImage}" alt="back" /></div>
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;

    if (first.dataset.value === second.dataset.value) {
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === cards.length) {
        setTimeout(() => alert('🎉 You found all pairs!'), 300);
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}

function restartGame() {
  createBoard();
}

createBoard();