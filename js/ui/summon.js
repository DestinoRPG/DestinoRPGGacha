import { renderCard } from "./card.js";

export function renderSummonResult(card) {

    return `

        <div class="summon-result">

            <div class="summon-background"></div>

            <div class="summon-particles"></div>

            <div class="summon-title">

                ✨ ¡NUEVA CARTA! ✨

            </div>

            <div
                id="summonSubtitle"
                class="summon-subtitle"
            >

                Una presencia aparece...

            </div>

            <div class="summon-animation">

                <div
                    id="summonFlash"
                    class="summon-flash"
                ></div>

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

                        ${renderCard(
                            card,
                            true,
                            "summon"
                        )}

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