import { renderCard } from "./card.js";

export function renderSummonResult(card) {

    return `

        <div class="summon-result">

            <div class="summon-title">

                ✨ ¡NUEVA CARTA! ✨

            </div>

            <div class="summon-subtitle">

                Pulsa sobre la carta para verla en detalle

            </div>

            <div class="summon-card">

                ${renderCard(card, true)}

            </div>

        </div>

    `;

}