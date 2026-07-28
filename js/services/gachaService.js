import { getBannerCards } from "./bannerService.js";
import { addCardToUser } from "./userService.js";

/**
 * Devuelve las cartas que el usuario aún no posee
 * dentro de un banner.
 */
export async function getAvailableCards(eventId, user) {

    const bannerCards = await getBannerCards(eventId);

    return bannerCards.filter(card =>
        !user.ownedCards.includes(card.id)
    );
}

/**
 * Realiza una invocación.
 */
export async function summon(eventId, user) {

    const availableCards = await getAvailableCards(eventId, user);

    if (availableCards.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);

    const card = availableCards[randomIndex];

    await addCardToUser(user, card.id);

    return card;
}