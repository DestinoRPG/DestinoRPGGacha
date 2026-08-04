import { renderBanner } from "../banner.js";
import { renderProfile, renderCollectionProgress } from "../profile.js";


export function renderHome(profile) {

    const progress =
        renderCollectionProgress(
            "Salón de la Fama",
            profile.ownedCards.length,
            profile.totalCards ?? profile.ownedCards.length
        );

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


export function initializeHome() {

    // Reservado para futuros eventos propios
    // de la pantalla principal.

}