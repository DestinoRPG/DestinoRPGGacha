import { renderBanner } from "../banner.js";
import {
    renderProfile,
    renderCollectionProgress
} from "../profile.js";

import { COLLECTIONS } from "../../data/collections.js";
import { getCardsByCollection } from "../../services/cardService.js";

export async function renderHome(profile) {

    let progress = "";

    for (const collection of COLLECTIONS) {

        if (!collection.enabled) {
            continue;
        }

        const cards =
            await getCardsByCollection(
                collection.id
            );

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

        <div class="home-main">

            <section class="home-profile">

                ${renderProfile(
                    profile,
                    progress
                )}

            </section>

            <section class="home-summon">

                ${renderBanner(profile)}

            </section>

        </div>

        <div id="resultArea"></div>

    </section>

`;

}

export function initializeHome() {

}