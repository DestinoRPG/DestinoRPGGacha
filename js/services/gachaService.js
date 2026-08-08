import {
    getAvailableBannerCards
} from "./bannerService.js";

import {
    addCardToUser
} from "./userService.js";

import {
    spendTickets
} from "./rewardService.js";

import {
    SUMMON_COST
} from "../config.js";


/**
 * Realiza una invocación.
 */
export async function summon(
    eventId,
    user
) {

    // No puede invocar sin tickets

    if (
        user.tickets <= 0
    ) {

        return {

            success: false,

            reason:
                "NO_TICKETS"

        };

    }


    const availableCards =
        await getAvailableBannerCards(
            eventId,
            user
        );


    // No quedan cartas disponibles

    if (
        availableCards.length === 0
    ) {

        return {

            success: false,

            reason:
                "COLLECTION_COMPLETE"

        };

    }


    const randomIndex =
        Math.floor(
            Math.random() *
            availableCards.length
        );


    const card =
        availableCards[randomIndex];


    // Gastar un ticket

    const spent =
        await spendTickets(
            user,
            SUMMON_COST
        );


    if (!spent) {

        return {

            success: false,

            reason:
                "NO_TICKETS"

        };

    }


    // Añadir carta a la colección

    const result =
        await addCardToUser(
            user,
            card.id
        );


    return {

        success: true,

        card: card,

        completionRewards:
            result.completionRewards

    };

}