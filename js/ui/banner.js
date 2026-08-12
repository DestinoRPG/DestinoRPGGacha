import { canSummon } from "../services/rewardService.js";


export function renderBanner(user) {

    return `

        <section class="banner">

            <!-- =================================================
                 ESCENA ESPACIAL
                 ================================================= -->

            <div class="banner-space">

                <!-- Estrellas de fondo -->
                <div class="banner-stars"></div>

                <!-- Estrellas / partículas individuales -->
                <span class="banner-spark banner-spark-1">✦</span>
                <span class="banner-spark banner-spark-2">✦</span>
                <span class="banner-spark banner-spark-3">·</span>
                <span class="banner-spark banner-spark-4">✦</span>

                <!-- Disco de acreción -->
                <div class="banner-accretion">

                    <div class="banner-accretion-ring"></div>

                </div>

                <!-- Brillo del horizonte -->
                <div class="banner-horizon"></div>

                <!-- Agujero negro -->
                <div class="banner-blackhole">

                    <div class="banner-event-horizon"></div>

                </div>

                <!-- Pequeños detalles orbitales -->
                <div class="banner-orbit banner-orbit-1"></div>
                <div class="banner-orbit banner-orbit-2"></div>

            </div>


            <!-- =================================================
                 BOTÓN DE INVOCACIÓN
                 ================================================= -->

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