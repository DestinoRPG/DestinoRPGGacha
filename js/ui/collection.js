import { renderCard } from "./card.js";

export function renderCollection(cards, user) {

    let html = `
        <h2>Salón de la Fama</h2>

        <div class="collection-grid">
    `;

    for (const card of cards) {

        html += renderCard(
            card,
            user.ownedCards.includes(card.id)
        );

    }

    html += `
        </div>
    `;

    return html;

}