import { getEvent } from "./eventService.js";
import { getAllCards } from "./cardService.js";

/**
 * Devuelve todas las cartas que pertenecen a un banner.
 */
export async function getBannerCards(eventId) {

    const event = await getEvent(eventId);

    if (!event) {
        return [];
    }

    const cards = await getAllCards();

    return cards.filter(card =>
        event.collections.includes(card.collection)
    );
}