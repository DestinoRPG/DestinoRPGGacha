import { renderBanner } from "../banner.js";
import {
    renderProfile,
    renderCollectionProgress
} from "../profile.js";

import { COLLECTIONS } from "../../data/collections.js";
import { getCardsByCollection } from "../../services/cardService.js";

export async function renderHome(profile) {

    console.log("PROFILE:", profile);
    console.log("OWNED:", profile.ownedCards);

    let progress = "";

    for (const collection of COLLECTIONS.filter(c => c.enabled)) {

        console.log("Colección:", collection.id);

        let cards = [];

        try {

            cards =
                await getCardsByCollection(
                    collection.id
                );

            console.log(
                "Cartas:",
                cards
            );

        }
        catch (error) {

            console.error(
                "ERROR cargando colección",
                collection.id,
                error
            );

        }

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

    console.log("Render terminado");

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