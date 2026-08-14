import { renderBanner } from "../banner.js";

import {
    renderProfile,
    renderCollectionProgress
} from "../profile.js";

import { COLLECTIONS } from "../../data/collections.js";

import {
    getCardsByCollection
} from "../../services/cardService.js";

import {
    renderNews,
    initializeNews
} from "../news.js";

import { renderSummonPlaceholder } from "../summon.js";


export async function renderHome(profile) {

    let progress = "";


    for (const collection of COLLECTIONS) {

        if (
            !collection.enabled ||
            !collection.showInProfile
        ) {
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

    <div id="resultArea">

        ${renderSummonPlaceholder()}

    </div>

</section>


                <section class="home-news">

                    ${renderNews(profile)}

                </section>


            </div>


        </section>

    `;

}


export function initializeHome(profile) {

    initializeNews(profile);

}