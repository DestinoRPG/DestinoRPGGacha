import { getAvailableBannerCards } from "./bannerService.js";
import { addCardToUser, updateUser } from "./userService.js";

/**
 * Realiza una invocación.
 */
export async function summon(eventId, user) {

    // No puede invocar sin tickets
    if (user.tickets <= 0) {

        return {
            success: false,
            reason: "NO_TICKETS"
        };

    }


    const availableCards = await getAvailableBannerCards(
        eventId,
        user
    );


    // No quedan cartas disponibles
    if (availableCards.length === 0) {

        return {
            success: false,
            reason: "COLLECTION_COMPLETE"
        };

    }


    const randomIndex =
        Math.floor(Math.random() * availableCards.length);


    const card = availableCards[randomIndex];


    // Gastar ticket
    const remainingTickets = user.tickets - 1;


console.log("UID:", user.uid);
console.log("Tickets actuales:", user.tickets);
console.log("Tickets a guardar:", remainingTickets);

await updateUser(
    user.uid,
    {
        tickets: remainingTickets
    }
);

console.log("Actualización enviada");


    // Actualizar usuario local
    user.tickets = remainingTickets;


    // Añadir carta a colección
    await addCardToUser(
        user,
        card.id
    );


    return {
        success: true,
        card: card
    };

}