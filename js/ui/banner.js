import { canSummon } from "../services/rewardService.js";


export function renderBanner(user) {

    return `

        <section class="banner">

<div class="banner-space">

    <div class="banner-stars"></div>

    <div class="banner-orbit banner-orbit-1"></div>
    <div class="banner-orbit banner-orbit-2"></div>

    <div class="banner-portal">

        <div class="banner-chain banner-chain-1"></div>
        <div class="banner-chain banner-chain-2"></div>
        <div class="banner-chain banner-chain-3"></div>

        <div class="banner-lock"></div>

    </div>

    <span class="banner-spark banner-spark-1">✦</span>
    <span class="banner-spark banner-spark-2">✦</span>
    <span class="banner-spark banner-spark-3">✦</span>
    <span class="banner-spark banner-spark-4">✦</span>

</div>

            </div>


            <div class="banner-info">

                <button
                    id="summonButton"
                    class="banner-button"
                    ${!canSummon(user) ? "disabled" : ""}
                >

                    <span class="key-icon">

                        <span class="key-icon-ring"></span>

                        <span class="key-icon-stem"></span>

                        <span class="key-icon-teeth"></span>

                    </span>


                    <span class="banner-button-info">

                        <span class="banner-button-main">
                            INVOCAR
                        </span>

                        <span class="banner-button-sub">
                            1 LLAVE
                        </span>

                    </span>

                </button>

            </div>

        </section>

    `;

}