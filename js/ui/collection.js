export function renderCollection(cards, user) {

    let html = `
        <h2>Hall of Fame</h2>

        <div class="collection-grid">
    `;

    for (const card of cards) {

        const owned = user.ownedCards.includes(card.id);

        html += `
            <div class="collection-card">

                <img
    src="${card.image}"
    alt="${card.title}"
    class="${owned ? "" : "locked-card"}"
>

                <h3>${card.title}</h3>

            </div>
        `;

    }

    html += `
        </div>
    `;

    return html;

}