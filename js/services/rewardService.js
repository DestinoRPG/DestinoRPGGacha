import { updateUser } from "./userService.js";

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

    // Ya estaba reclamada
    if (hasClaimedReward(user, cardId)) {

        return {
            success: false,
            reason: "ALREADY_CLAIMED"
        };

    }

    // Copiamos las recompensas actuales
    const claimedRewards = {

        ...(user.claimedRewards ?? {}),

        [cardId]: true

    };

    // Guardamos tickets y recompensa en una sola escritura
    const tickets = user.tickets + 1;

    await updateUser(
        user.uid,
        {
            tickets,
            claimedRewards
        }
    );

    // Actualizamos el usuario local
    user.tickets = tickets;
    user.claimedRewards = claimedRewards;

return {
    success: true,
    tickets: 1
};

/**
 * Comprueba si el usuario tiene suficientes tickets.
 */
export function canSummon(user, cost = 1) {

    return user.tickets >= cost;

}

}