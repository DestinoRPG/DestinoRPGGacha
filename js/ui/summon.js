import { renderCard } from "./card.js";

export function renderSummonResult(card) {

    return `
        <h2>¡Nueva carta!</h2>

        ${renderCard(card, true)}
    `;

}