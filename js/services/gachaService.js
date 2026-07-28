import { getBannerCards } from "./bannerService.js";

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