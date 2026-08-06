import { renderCard } from "./card.js";

export function renderSummonResult(card) {

    return `

        <div class="summon-result">

            <div class="summon-title">

                ✨ ¡NUEVA CARTA! ✨

            </div>

            <div class="summon-subtitle">

                Descubriendo carta...

            </div>

            <div class="summon-animation">

                <div
                    id="summonFlip"
                    class="summon-flip"
                >

                    <div class="summon-face summon-back">

                        <img
                            src="images/card-back.webp"
                            alt=""
                        >

                    </div>

                    <div class="summon-face summon-front">

                        ${renderCard(card, true)}

                    </div>

                </div>

            </div>

        </div>

    `;

}

export function renderSummonLoading() {

    return `

        <div class="summon-loading">

            <div class="summon-circle"></div>

            <h2>

                INVOCANDO...

            </h2>

        </div>

    `;

}