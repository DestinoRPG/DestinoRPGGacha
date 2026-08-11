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

    <span class="ticket-symbol button-ticket">
        <span class="ticket-symbol-notch top"></span>
        <span class="ticket-symbol-notch bottom"></span>
    </span>

    <span>
        INVOCAR · 1 TICKET
    </span>

</button>
            </div>

        </section>

    `;

}