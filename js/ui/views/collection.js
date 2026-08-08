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


        const total =
            collectionCards.length;


        const completed =
            total > 0 &&
            owned >= total;


        html += `

            <button

                class="
                    collection-jump
                    ${completed ? "completed" : ""}
                "

                data-target="${collection.id}"

            >

                <span>

                    ${collection.icon}
                    ${collection.name}

                    ${
                        completed
                            ? `<span class="jump-complete">✦</span>`
                            : ""
                    }

                </span>

                <small>

                    ${owned}
                    /
                    ${total}

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


        const completed =
            total > 0 &&
            owned >= total;


        html += `

            <section

                id="${collection.id}"

                class="
                    collection-section
                    ${completed ? "completed" : ""}
                "

            >

                <div class="collection-header">

                    <div>

                        <h2 class="collection-title">

                            ${collection.icon}
                            ${collection.name}

                        </h2>

                        <p class="collection-subtitle">

                            ${
                                completed
                                    ? "✦ Colección completada · "
                                    : ""
                            }

                            ${owned}
                            de
                            ${total}
                            cartas descubiertas

                        </p>

                    </div>


                    <div class="collection-counter">

                        ${
                            completed
                                ? "✦"
                                : `${percentage}%`
                        }

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