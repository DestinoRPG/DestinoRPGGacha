import { canSummon } from "../services/rewardService.js";

export function renderBanner(user) {

    return `

        <section class="banner">

            <div class="banner-image">

                <img
                    src="images/banners/standard.webp"
                    alt="Invocación estándar"
                >

            </div>


            <div class="banner-info">


                <button
                    id="summonButton"
                    class="banner-button"
                    ${!canSummon(user) ? "disabled" : ""}
                >

                    🎟️ Invocar · 1 ticket

                </button>

            </div>

        </section>

    `;

}