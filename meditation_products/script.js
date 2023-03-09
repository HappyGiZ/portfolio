let cards = document.querySelectorAll('.cushions-cards'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'), counter = 0;

function hideCards() {
  cards.forEach(element => {
    element.classList.add('hide');
  });
}

function showCards(i = 0) {
  cards[i].classList.remove('hide');
}


hideCards();
showCards(0);

prev.addEventListener('click', () => {
  if (counter > 0) {
    counter--;
    hideCards();
    showCards(counter);
  } else {
    counter = cards.length - 1;
    hideCards();
    showCards(counter);
  }
});

next.addEventListener('click', () => {
  if (counter < cards.length - 1) {
    counter++;
    hideCards();
    showCards(counter);
  } else {
    counter = 0;
    hideCards();
    showCards(counter);
  }
});