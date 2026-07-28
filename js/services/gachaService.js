import { getAvailableBannerCards } from "./bannerService.js";
import { addCardToUser } from "./userService.js";

/**
 * Realiza una invocación.
 */
export async function summon(eventId, user) {

    const availableCards = await getAvailableBannerCards(eventId, user);

    if (availableCards.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);

    const card = availableCards[randomIndex];

    await addCardToUser(user, card.id);

    return card;
}