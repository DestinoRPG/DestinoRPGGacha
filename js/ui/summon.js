import { renderCard } from "./card.js";

export function renderSummonResult(card) {

    return `
        <h2>¡Has conseguido una nueva carta!</h2>

        ${renderCard(card, true)}
    `;

}