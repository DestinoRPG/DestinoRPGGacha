import { updateUser } from "./userService.js";
import { getCard } from "./cardService.js";

/**
 * Devuelve la fecha actual en formato YYYY-MM-DD
 * usando la hora local del usuario.
 */
function getToday() {

    return new Date().toLocaleDateString(
        "sv-SE"
    );

}


/**
 * =========================================================
 * RECOMPENSAS DE EVENTOS
 * =========================================================
 *
 * Cada evento puede tener una cantidad diferente de tickets.
 *
 * IMPORTANTE:
 * No usamos una función genérica como:
 *
 *     giveTickets(user, amount)
 *
 * porque permitiría que cualquier parte del cliente
 * solicite directamente una cantidad arbitraria.
 *
 * Aquí las recompensas están asociadas a un ID concreto.
 *
 * Más adelante podemos mover esta configuración a Firestore
 * si queremos que los eventos sean completamente configurables.
 */
const EVENT_REWARDS = {

    anniversary_14: {
        tickets: 1,
        cardId: "14aniversario"
    },

    anniversary_15: {
        tickets: 3,
        cardId: "15aniversario"
    },

    gacha_launch: {
        tickets: 5,
        cardId: "gacha_launch"
    }

};


/**
 * =========================================================
 * GASTAR TICKETS
 * =========================================================
 */
export async function spendTickets(
    user,
    amount = 1
) {

    if (user.tickets < amount) {

        return false;

    }


    const tickets =
        user.tickets - amount;


    const totalSummons =
        (user.totalSummons ?? 0) + 1;


    await updateUser(

        user.uid,

        {

            tickets,

            totalSummons

        }

    );


    user.tickets =
        tickets;

    user.totalSummons =
        totalSummons;


    return true;

}


/**
 * =========================================================
 * RECOMPENSAS POR CARTA / ARTÍCULO
 * =========================================================
 */

/**
 * Comprueba si una recompensa ya fue reclamada.
 */
export function hasClaimedReward(
    user,
    rewardId
) {

    return Boolean(
        user.claimedRewards?.[rewardId]
    );

}


/**
 * Reclama la recompensa asociada a una carta.
 */
export async function claimCardReward(
    user,
    cardId
) {

    // -----------------------------------------------------
    // La carta debe existir
    // -----------------------------------------------------

    const card =
        await getCard(cardId);


    if (!card) {

        return {

            success: false,

            reason:
                "CARD_NOT_FOUND"

        };

    }


    // -----------------------------------------------------
    // El usuario debe poseer la carta
    // -----------------------------------------------------

    if (
        !user.ownedCards.includes(
            cardId
        )
    ) {

        return {

            success: false,

            reason:
                "CARD_NOT_OWNED"

        };

    }


    // -----------------------------------------------------
    // Ya estaba reclamada
    // -----------------------------------------------------

    if (
        hasClaimedReward(
            user,
            cardId
        )
    ) {

        return {

            success: false,

            reason:
                "ALREADY_CLAIMED"

        };

    }


    // -----------------------------------------------------
    // Registrar recompensa
    // -----------------------------------------------------

    const claimedRewards = {

        ...(user.claimedRewards ?? {}),

        [cardId]: true

    };


    const tickets =
        (user.tickets ?? 0) + 1;


    const articleRewardsClaimed =
        (user.articleRewardsClaimed ?? 0) + 1;


    await updateUser(

        user.uid,

        {

            tickets,

            claimedRewards,

            articleRewardsClaimed

        }

    );


    // Actualizar objeto local

    user.tickets =
        tickets;

    user.claimedRewards =
        claimedRewards;

    user.articleRewardsClaimed =
        articleRewardsClaimed;


    return {

        success: true,

        tickets: 1,

        card

    };

}


/**
 * =========================================================
 * RECOMPENSA DIARIA
 * =========================================================
 */
export async function claimDailyReward(
    user
) {

    const today =
        getToday();


    // -----------------------------------------------------
    // Ya reclamó la recompensa hoy
    // -----------------------------------------------------

    if (
        (user.lastDailyReward ?? null)
            === today
    ) {

        return {

            success: false,

            reason:
                "ALREADY_CLAIMED"

        };

    }


    const tickets =
        (user.tickets ?? 0) + 1;


    const dailyRewardsClaimed =
        (user.dailyRewardsClaimed ?? 0) + 1;


    await updateUser(

        user.uid,

        {

            tickets,

            lastDailyReward:
                today,

            dailyRewardsClaimed

        }

    );


    // Actualizar objeto local

    user.tickets =
        tickets;

    user.lastDailyReward =
        today;

    user.dailyRewardsClaimed =
        dailyRewardsClaimed;


    return {

        success: true,

        tickets: 1

    };

}


/**
 * =========================================================
 * RECOMPENSAS DE EVENTOS
 * =========================================================
 *
 * Ejemplo:
 *
 *     claimEventReward(
 *         user,
 *         "anniversary_14"
 *     );
 *
 * El ID determina qué recompensa corresponde.
 */
export async function claimEventReward(
    user,
    eventId
) {

    const reward =
        EVENT_REWARDS[eventId];


    // -----------------------------------------------------
    // Evento desconocido
    // -----------------------------------------------------

    if (!reward) {

        return {

            success: false,

            reason:
                "EVENT_REWARD_NOT_FOUND"

        };

    }


    // -----------------------------------------------------
    // Ya fue reclamada
    // -----------------------------------------------------

    if (
        hasClaimedReward(
            user,
            eventId
        )
    ) {

        return {

            success: false,

            reason:
                "ALREADY_CLAIMED"

        };

    }


    // -----------------------------------------------------
    // Preparar recompensas
    // -----------------------------------------------------

    const claimedRewards = {

        ...(user.claimedRewards ?? {}),

        [eventId]: true

    };


    const tickets =
        (user.tickets ?? 0) +
        reward.tickets;


    let updatedCards =
        [...(user.ownedCards ?? [])];


    let cardsObtained =
        user.cardsObtained ?? 0;


    let alreadyOwned =
        false;


    // -----------------------------------------------------
    // Añadir carta del evento si existe
    // -----------------------------------------------------

    if (reward.cardId) {

        alreadyOwned =
            updatedCards.includes(
                reward.cardId
            );


        if (!alreadyOwned) {

            updatedCards.push(
                reward.cardId
            );

            updatedCards.sort();

            cardsObtained++;

        }

    }


    // -----------------------------------------------------
    // Guardar
    // -----------------------------------------------------

    await updateUser(

        user.uid,

        {

            tickets,

            claimedRewards,

            ownedCards:
                updatedCards,

            cardsObtained

        }

    );


    // -----------------------------------------------------
    // Actualizar usuario local
    // -----------------------------------------------------

    user.tickets =
        tickets;


    user.claimedRewards =
        claimedRewards;


    user.ownedCards =
        [...updatedCards];


    user.cardsObtained =
        cardsObtained;


    return {

        success: true,

        eventId,

        tickets:
            reward.tickets,

        cardId:
            reward.cardId ?? null,

        alreadyOwned

    };

}


/**
 * =========================================================
 * COMPROBAR TICKETS
 * =========================================================
 */
export function canSummon(
    user,
    cost = 1
) {

    return (
        (user.tickets ?? 0) >= cost
    );

}