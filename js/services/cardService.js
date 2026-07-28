let cardsCache = null;

/**
 * Carga el JSON de cartas (solo una vez).
 */
async function loadCards() {

    if (cardsCache) {
        return cardsCache;
    }

    const response = await fetch("./data/cards.json");

    if (!response.ok) {
        throw new Error("No se pudo cargar cards.json");
    }

    cardsCache = await response.json();

    return cardsCache;
}

/**
 * Devuelve todas las cartas habilitadas.
 */
export async function getAllCards() {

    const cards = await loadCards();

    return cards.filter(card => card.enabled);
}

/**
 * Devuelve una carta por su ID.
 */
export async function getCard(id) {

    const cards = await getAllCards();

    return cards.find(card => card.id === id) || null;
}

/**
 * Devuelve todas las cartas de una colección.
 */
export async function getCardsByCollection(collection) {

    const cards = await getAllCards();

    return cards.filter(card => card.collection === collection);
}

/**
 * Devuelve todas las cartas de una rareza.
 */
export async function getCardsByRarity(rarity) {

    const cards = await getAllCards();

    return cards.filter(card => card.rarity === rarity);
}

/**
 * Vacía la caché.
 * Útil durante el desarrollo o si algún día añadimos actualización dinámica.
 */
export function clearCardsCache() {
    cardsCache = null;
}