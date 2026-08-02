import { renderCard } from "./card.js";

export function renderCollection(cards, user) {

    let html = `
        <h2>Hall of Fame</h2>

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