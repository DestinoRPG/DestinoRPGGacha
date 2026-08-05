import { renderCard } from "../card.js";
import { COLLECTIONS } from "../../data/collections.js";

export function renderCollectionView(
    cards,
    profile
) {

    let html = `

        <section class="collection-view">

    `;

    for (const collection of COLLECTIONS.filter(c => c.enabled)) {

        const collectionCards =
            cards.filter(
                card =>
                    card.collection === collection.id
            );

        const owned =
            collectionCards.filter(
                card =>
                    profile.ownedCards.includes(card.id)
            ).length;

        const total =
            collectionCards.length;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    owned / total * 100
                );

        html += `

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

        `;

    }

    html += `

        </section>

    `;

    return html;

}