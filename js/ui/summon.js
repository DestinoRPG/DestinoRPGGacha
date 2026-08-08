import { renderCard } from "./card.js";

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

                    <div class="summon-face summon-back">

                        <img
                            src="images/card-back.webp"
                            alt=""
                        >

                    </div>

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