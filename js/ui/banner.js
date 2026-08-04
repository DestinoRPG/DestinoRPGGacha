import { canSummon } from "../services/rewardService.js";

export function renderBanner(user) {

    return `

        <section class="banner">

            <button

                id="summonButton"

                class="banner-button"

                ${!canSummon(user) ? "disabled" : ""}

            >

                <img

                    src="images/banners/standard.webp"

                    alt="Invocación estándar"

                >

            </button>

        </section>

    `;

}