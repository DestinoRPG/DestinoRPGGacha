import { renderBanner } from "../banner.js";

import {
    renderProfile,
    renderCollectionProgress
} from "../profile.js";

import { COLLECTIONS } from "../../data/collections.js";

import {
    getCardsByCollection
} from "../../services/cardService.js";


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


        progress +=
            renderCollectionProgress(

                collection.name,

                owned,

                cards.length

            );

    }


    return `

        <section class="home-view">


            <!-- =========================
                 FILA SUPERIOR
            ========================== -->

            <div class="home-main">


                <section class="home-profile">

                    ${renderProfile(
                        profile,
                        progress
                    )}

                </section>


                <section class="home-summon">

                    ${renderBanner(
                        profile
                    )}

                </section>


            </div>



            <!-- =========================
                 FILA INFERIOR
            ========================== -->

            <div class="home-bottom">


                <section class="home-result">

                    <div id="resultArea"></div>

                </section>


                <section class="home-news">

                    <div class="news-panel">

                        <button
                            class="news-arrow news-prev"
                            aria-label="Noticia anterior"
                        >
                            ‹
                        </button>


                        <div class="news-content">

                            <div class="news-label">
                                NOTICIAS
                            </div>

                            <h2>
                                Bienvenido a Destino RPG Gacha
                            </h2>

                            <p>
                                ¡Consigue cartas, completa colecciones
                                y descubre todas las recompensas!
                            </p>

                        </div>


                        <button
                            class="news-arrow news-next"
                            aria-label="Siguiente noticia"
                        >
                            ›
                        </button>

                    </div>

                </section>


            </div>


        </section>

    `;
}


export function initializeHome() {

}