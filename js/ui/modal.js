export function renderModal(card) {

    const articles = (card.articles ?? [])
        .map(article => `
            <a
                class="article-link"
                href="${article.url}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${article.title}
            </a>
        `)
        .join("");

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

                <h2>${card.number.toString().padStart(3, "0")} · ${card.title}</h2>

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

                ${
                    card.description
                        ? `
                        <p class="card-description">
                            ${card.description}
                        </p>
                        `
                        : ""
                }

                ${
                    card.articles?.length
                        ? `
                        <h3>Artículos relacionados</h3>

                        <div class="article-list">
                            ${articles}
                        </div>
                        `
                        : ""
                }

            </div>

        </div>
    `;

}