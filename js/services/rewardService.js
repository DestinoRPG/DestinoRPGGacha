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
 * Añade tickets a un usuario.
 */
export async function giveTickets(user, amount) {

    const total = user.tickets + amount;

    await updateUser(
        user.uid,
        {
            tickets: total
        }
    );

    user.tickets = total;

    return total;

}

/**
 * Gasta tickets.
 */
export async function spendTickets(user, amount = 1) {

    if (user.tickets < amount) {

        return false;

    }

    const total = user.tickets - amount;

    await updateUser(
        user.uid,
        {
            tickets: total
        }
    );

    user.tickets = total;

    return true;

}

/**
 * Comprueba si una carta ya dio su recompensa.
 */
export function hasClaimedReward(user, cardId) {

    return Boolean(
        user.claimedRewards?.[cardId]
    );

}

/**
 * Reclama la recompensa asociada a una carta.
 */
export async function claimCardReward(user, cardId) {

    // La carta debe existir
    const card = await getCard(cardId);

    if (!card) {

        return {
            success: false,
            reason: "CARD_NOT_FOUND"
        };

    }

    // El usuario debe poseer la carta
    if (!user.ownedCards.includes(cardId)) {

        return {
            success: false,
            reason: "CARD_NOT_OWNED"
        };

    }

    // Ya estaba reclamada
    if (hasClaimedReward(user, cardId)) {

        return {
            success: false,
            reason: "ALREADY_CLAIMED"
        };

    }

    const claimedRewards = {

        ...(user.claimedRewards ?? {}),

        [cardId]: true

    };

    const tickets = user.tickets + 1;

    await updateUser(
        user.uid,
        {
            tickets,
            claimedRewards
        }
    );

    user.tickets = tickets;
    user.claimedRewards = claimedRewards;

    return {

        success: true,
        tickets: 1,
        card

    };

}

/**
 * Reclama el ticket diario.
 */
export async function claimDailyReward(user) {

    const today = getToday();

    if ((user.lastDailyReward ?? null) === today) {

        return {

            success: false,
            reason: "ALREADY_CLAIMED"

        };

    }

    const tickets = user.tickets + 1;

    await updateUser(
        user.uid,
        {
            tickets,
            lastDailyReward: today
        }
    );

    user.tickets = tickets;
    user.lastDailyReward = today;

    return {

        success: true,
        tickets: 1

    };

}

/**
 * Comprueba si el usuario tiene suficientes tickets.
 */
export function canSummon(user, cost = 1) {

    return user.tickets >= cost;

}