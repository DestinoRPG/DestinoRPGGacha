export function renderCard(card, owned = true) {

    return `
        <div
            class="card ${owned ? "" : "locked-card"}"
            data-card="${card.id}"
        >

            <img
                src="${card.image}"
                alt="${card.title}"
                loading="lazy"
            >

            ${
                owned
                    ? ""
                    : `<div class="card-lock">🔒</div>`
            }

            <div class="card-overlay">

                <div class="card-title">
                    ${card.title}
                </div>

            </div>

        </div>
    `;

}