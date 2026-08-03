import { COLLECTIONS } from "../data/collections.js";

export function renderModal(card, owned = true) {

    const collection = COLLECTIONS.find(
        c => c.id === card.collection
    );

    if (!owned) {

return `

    <div class="modal-overlay">

        <div class="modal locked-modal">

            <button id="closeModal">

                ✕

            </button>

            <img
                class="locked-image"
                src="images/card-back.webp"
                alt="Carta sin descubrir"
            >

            <div class="locked-icon">

                🔒

            </div>

            <h2 class="locked-title">

                Carta sin descubrir

            </h2>

            <div class="locked-number">

                #${String(card.number).padStart(3, "0")}

            </div>

            <div class="locked-collection">

                ${collection
                    ? `${collection.icon} ${collection.name}`
                    : card.collection}

            </div>

            <p class="locked-description">

                Consíguela mediante invocaciones para revelar toda su información.

            </p>

        </div>

    </div>

`;

    }

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

                <h2>

                    ${String(card.number).padStart(3, "0")} · ${card.title}

                </h2>

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
                        <h3>

                            Artículos relacionados

                        </h3>

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