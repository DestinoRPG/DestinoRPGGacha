export function renderModal(card) {

    return `
        <div class="modal-overlay">

            <div class="modal">

                <button id="closeModal">
                    ✕
                </button>

                <img
                    src="${card.image}"
                    alt="${card.title}"
                >

                <h2>${card.title}</h2>

                <div class="card-info">

                    <p>
                        <strong>Saga:</strong>
                        ${card.series}
                    </p>

                    <p>
                        <strong>Desarrolladora:</strong>
                        ${card.developer}
                    </p>

                    <p>
                        <strong>Lanzamiento:</strong>
                        ${card.releaseYear}
                    </p>

                </div>

                <p>
                    ${card.description ?? ""}
                </p>

                <button disabled>
                    Leer en Destino RPG
                </button>

            </div>

        </div>
    `;

}