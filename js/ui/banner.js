import { canSummon } from "../services/rewardService.js";

export function renderBanner(user) {

    return `

        <section class="banner">

<div class="banner-image">

    <div class="banner-scene">

        <div class="banner-stars"></div>

        <div class="banner-orbit banner-orbit-1"></div>
        <div class="banner-orbit banner-orbit-2"></div>

        <div class="banner-core">

            <span class="banner-core-symbol">✦</span>

            <span class="banner-core-title">
                DESTINO RPG
            </span>

            <span class="banner-core-subtitle">
                INVOCACIÓN
            </span>

        </div>

        <span class="banner-spark banner-spark-1">✦</span>
        <span class="banner-spark banner-spark-2">✧</span>
        <span class="banner-spark banner-spark-3">✦</span>
        <span class="banner-spark banner-spark-4">·</span>

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