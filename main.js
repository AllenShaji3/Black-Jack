const deal_btn = document.querySelector("#deal");
const results = document.querySelector("#shw-crd");
const selected = document.querySelector("#selected");
const deselected = document.querySelector("#deselected");
selected.addEventListener("click", selectedCards);
deselected.addEventListener("click", deselectedCards);
let deck_id;
let hand = [];
let localHand = JSON.parse(localStorage.getItem("storeHand"));
if (localHand != null) {
  hand = localHand;
  render(hand);
}
init();

shuffle_card();
function shuffle_card() {
  const id = fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  )
    .then(blob => blob.json())
    .then(data => (deck_id = data.deck_id));
}
function init() {
  deal_btn.addEventListener("click", () => {
    console.log(deck_id);

    var card =
      "https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=1";
    fetch(card)
      .then(card => card.json())
      .then(data => {
        console.log(data);
        hand.push(data);
        localStorage.setItem("storeHand", JSON.stringify(hand)); //Storing in local storage to retrieve data on refresh

        shuffle_card();
        render(hand);
      });
  });
}

function render(hand) {
  let crds = [];
  var a = 0;
  results.innerHTML = hand
    .map(
      hands =>
        `<div class="card${
          hand[a].selected ? "selected" : ""
        }" data-idx="${a++}"><img src =${hands.cards[0].images.png}> </div>`
    )
    .join("");
  const dis_cards = [...document.querySelectorAll(".card")];
  dis_cards.map(card => card.addEventListener("click", selectCard));
}

//function to select a card
function selectCard() {
  console.log(this.dataset.idx);
  const index = this.dataset.idx;
  hand[index].selected = true;
  render(hand);
}
//fuction to show the selected cards
function selectedCards() {
  hand = [...hand];
  render(hand.filter(hand => hand.selected));
}

// function to show unselected cards
function deselectedCards() {
  hand = [...hand];
  render(hand.filter(hand => hand.selected == null));
}
