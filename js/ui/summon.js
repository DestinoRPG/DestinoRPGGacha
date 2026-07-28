export function renderSummonResult(card) {

    return `
        <div class="summon-result">

            <h3>¡Has conseguido!</h3>

            <img
                src="images/cards/${card.image}"
                alt="${card.title}"
                class="card-image"
            >

            <h2>${card.title}</h2>

        </div>
    `;

}