import { getEvent } from "./eventService.js";
import { getAllCards } from "./cardService.js";

/**
 * Devuelve todas las cartas normales de un banner.
 *
 * Las cartas de recompensa por completar colecciones
 * no forman parte de la pool de invocación.
 */
export async function getBannerCards(eventId) {

    const event = await getEvent(eventId);

    if (!event) {
        return [];
    }

    const cards = await getAllCards();

    const collections = Array.isArray(event.collections)
        ? event.collections
        : [event.collection];

return cards.filter(card =>
    collections.includes(card.collection) &&
    !card.completionReward &&
    card.collection !== "eventos"
);
}


/**
 * Devuelve las cartas del banner que el usuario
 * aún no posee.
 */
export async function getAvailableBannerCards(eventId, user) {

    const bannerCards =
        await getBannerCards(eventId);

    return bannerCards.filter(card =>
        !user.ownedCards.includes(card.id)
    );
}


/**
 * Devuelve el progreso del usuario en un banner.
 */
export async function getBannerProgress(eventId, user) {

    const bannerCards =
        await getBannerCards(eventId);

    const owned =
        bannerCards.filter(card =>
            user.ownedCards.includes(card.id)
        );

    return {

        total:
            bannerCards.length,

        owned:
            owned.length,

        available:
            bannerCards.length -
            owned.length,

        completed:
            owned.length === bannerCards.length

    };
}