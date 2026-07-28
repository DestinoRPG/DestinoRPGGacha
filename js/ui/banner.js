export function renderBanner(eventTitle, availableCards) {

    return `
        <div class="banner">

            <h2>${eventTitle}</h2>

            <p>
                Cartas disponibles:
                <strong>${availableCards.length}</strong>
            </p>

            <button id="summonButton">
                Invocar
            </button>

        </div>
    `;

}