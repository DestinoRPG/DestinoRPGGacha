import { canSummon } from "../services/rewardService.js";


export function renderBanner(user) {

    return `

<section class="banner">

    <div class="banner-image-frame">

        <div class="banner-image">

            <img
                src="images/banners/standard.webp"
                alt="Portal de invocación"
            >

        </div>

    </div>


    <div class="banner-info">

        <button
            id="summonButton"
            class="banner-button"
            ${!canSummon(user) ? "disabled" : ""}
        >

            <span class="ticket-icon">

                <span class="ticket-icon-hole"></span>

            </span>

            <span class="banner-button-info">

                <span class="banner-button-main">
                    INVOCAR
                </span>

                <span class="banner-button-sub">
                    1 TICKET
                </span>

            </span>

        </button>

    </div>

</section>

    `;

}