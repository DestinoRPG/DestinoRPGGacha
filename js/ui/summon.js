import { renderCard } from "./card.js";


/* =======================================================
   PLACEHOLDER / CARTA CERRADA
======================================================= */

export function renderSummonPlaceholder() {

    return `

        <div class="summon-result summon-idle">

            <div class="summon-background"></div>

            <div class="summon-particles"></div>

            <div class="summon-idle-card">

                <img
                    src="images/card-back.webp"
                    alt="Carta disponible para invocar"
                >

                <div class="summon-idle-glow"></div>

            </div>

        </div>

    `;

}


/* =======================================================
   RESULTADO DE INVOCACIÓN
======================================================= */

export function renderSummonResult(card) {

    return `

        <div class="summon-result">

            <div class="summon-background"></div>

            <div class="summon-particles"></div>

            <div
                id="summonFlash"
                class="summon-flash"
            ></div>


            <div class="summon-animation">

                <div
                    id="summonFlip"
                    class="summon-flip"
                >


                    <!-- CARTA TRASERA -->

                    <div class="summon-face summon-back">

                        <img
                            src="images/card-back.webp"
                            alt=""
                        >

                    </div>


                    <!-- CARTA REVELADA -->

                    <div class="summon-face summon-front">

                        <div class="card-glow"></div>

                        <div class="summon-card">

                            ${renderCard(card, true)}

                            <div class="card-shine"></div>

                        </div>

                    </div>


                </div>

            </div>

        </div>

    `;

}


/* =======================================================
   LOADING
======================================================= */

export function renderSummonLoading() {

    /*
     * Ya no usamos una pantalla de carga.
     * Se mantiene la función por compatibilidad
     * con cualquier import existente.
     */

    return renderSummonPlaceholder();

}