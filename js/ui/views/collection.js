import { renderCard } from "../card.js";
import { COLLECTIONS } from "../../data/collections.js";

export function renderCollectionView(
    cards,
    profile
) {

    let html = `

        <section class="collection-view">

            <div class="collection-index">

    `;

    // =========================
    // Índice de colecciones
    // =========================

    for (const collection of COLLECTIONS) {

        if (!collection.enabled) {
            continue;
        }

        const collectionCards =
            cards.filter(card =>
                card.collection === collection.id
            );

        const owned =
            collectionCards.filter(card =>
                profile.ownedCards.includes(card.id)
            ).length;

        html += `

            <button

                class="collection-jump"

                data-target="${collection.id}"

            >

                <span>

                    ${collection.icon}
                    ${collection.name}

                </span>

                <small>

                    ${owned}
                    /
                    ${collectionCards.length}

                </small>

            </button>

        `;

    }

    html += `

            </div>

    `;

    // =========================
    // Colecciones
    // =========================

    for (const collection of COLLECTIONS) {

        if (!collection.enabled) {
            continue;
        }

        const collectionCards =
            cards.filter(card =>
                card.collection === collection.id
            );

        const owned =
            collectionCards.filter(card =>
                profile.ownedCards.includes(card.id)
            ).length;

        const total =
            collectionCards.length;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    owned /
                    total *
                    100
                );

        html += `

            <section

                id="${collection.id}"

                class="collection-section"

            >

                <div class="collection-header">

                    <div>

                        <h2 class="collection-title">

                            ${collection.icon}
                            ${collection.name}

                        </h2>

                        <p class="collection-subtitle">

                            ${owned}
                            de
                            ${total}
                            cartas descubiertas

                        </p>

                    </div>

                    <div class="collection-counter">

                        ${percentage}%

                    </div>

                </div>

                <div class="collection-grid">

        `;

        for (const card of collectionCards) {

            html += renderCard(

                card,

                profile.ownedCards.includes(
                    card.id
                )

            );

        }

        html += `

                </div>

            </section>

        `;

    }

    html += `

        </section>

    `;

    return html;

}