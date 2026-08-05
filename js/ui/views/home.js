import { renderBanner } from "../banner.js";
import {
    renderProfile,
    renderCollectionProgress
} from "../profile.js";

import { COLLECTIONS } from "../../data/collections.js";
import { getCardsByCollection } from "../../services/cardService.js";

export async function renderHome(profile) {

    console.log(profile);
    console.log(profile.ownedCards);

    let progress = "";

    for (const collection of COLLECTIONS.filter(c => c.enabled)) {

        const cards =
            await getCardsByCollection(collection.id);

        const owned =
            cards.filter(card =>
                profile.ownedCards.includes(card.id)
            ).length;

        progress += renderCollectionProgress(
            collection.name,
            owned,
            cards.length
        );

    }

    return `

        <section class="home-view">

            ${renderProfile(
                profile,
                progress
            )}

            ${renderBanner(
                profile
            )}

            <div id="resultArea"></div>

        </section>

    `;

}