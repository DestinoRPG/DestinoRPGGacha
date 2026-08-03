export function renderCard(card, owned = true) {

    const image = owned
        ? card.image
        : "images/card-back.webp";

    const number = owned
        ? String(card.number).padStart(3, "0")
        : "???";

    const title = owned
        ? card.title
        : "????????????";

    return `
        <div
            class="card ${owned ? "" : "locked-card"}"
            data-card="${card.id}"
        >

            <div class="card-header">

                <img
                    class="card-logo"
                    src="images/card-logo.webp"
                    alt=""
                >

                <span class="card-number">
                    ${number}
                </span>

            </div>

            <img
                class="card-image"
                src="${image}"
                alt="${title}"
                loading="lazy"
            >

            <div class="card-footer">

                <div class="card-title">
                    ${title}
                </div>

            </div>

        </div>
    `;

}