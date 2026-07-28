let cardsCache = null;

export async function getAllCards() {

    if (cardsCache) {
        return cardsCache;
    }

    const response = await fetch("./data/cards.json");

    cardsCache = await response.json();

    return cardsCache;
}