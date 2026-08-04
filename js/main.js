import { createUI } from "./ui.js";

import { renderUser } from "./ui/layout.js";
import { renderSummonResult } from "./ui/summon.js";

import { login, observeUser } from "./firebase/auth.js";

import { createOrLoadUser } from "./services/userService.js";
import { summon } from "./services/gachaService.js";

import { DEFAULT_BANNER } from "./config.js";

import { refreshUI } from "./ui/refresh.js";

import {
    claimCardReward,
    claimDailyReward
} from "./services/rewardService.js";

import {
    getUrlParams,
    hasPendingReward,
    clearUrlParams
} from "./services/urlService.js";

window.addEventListener("DOMContentLoaded", () => {

    createUI();

    document
        .getElementById("loginButton")
        .addEventListener("click", login);

    observeUser(async (user) => {

        if (!user) {

            document.getElementById("userArea").innerHTML = `
                <button id="loginButton">
                    Iniciar sesión
                </button>
            `;

            document
                .getElementById("loginButton")
                .addEventListener("click", login);

            return;

        }

        // =========================
        // Cargar usuario
        // =========================

        const profile = await createOrLoadUser(user);

        // =========================
        // Dibujar interfaz
        // =========================

        document.getElementById("userArea").innerHTML =
            renderUser();

        await refreshUI(profile);

        // =========================
        // Recompensas pendientes
        // =========================

        const params = getUrlParams();

        if (params.reward === "daily") {

            const result =
                await claimDailyReward(profile);

            if (result.success) {

                document.getElementById("resultArea").innerHTML = `
                    <h2>🎁 ¡Ticket diario conseguido!</h2>
                    <p>Has recibido <strong>1 ticket</strong>.</p>
                `;

            } else {

                document.getElementById("resultArea").innerHTML = `
                    <h2>📅 Ticket diario</h2>
                    <p>Ya has reclamado el ticket de hoy.</p>
                `;

            }

            await refreshUI(profile);

            clearUrlParams();

        }

        else if (hasPendingReward()) {

            const result =
                await claimCardReward(
                    profile,
                    params.card
                );

            if (result.success) {

                document.getElementById("resultArea").innerHTML = `
                    <h2>🎁 ¡Recompensa conseguida!</h2>
                    <p>Has recibido <strong>1 ticket</strong>.</p>
                `;

            }

            else if (result.reason === "ALREADY_CLAIMED") {

                document.getElementById("resultArea").innerHTML = `
                    <h2>ℹ️ Recompensa</h2>
                    <p>Ya habías reclamado esta recompensa.</p>
                `;

            }

            else if (result.reason === "CARD_NOT_OWNED") {

                document.getElementById("resultArea").innerHTML = `
                    <h2>🔒 Carta no obtenida</h2>
                    <p>Necesitas conseguir esta carta antes de reclamar su recompensa.</p>
                `;

            }

            else {

                document.getElementById("resultArea").innerHTML = `
                    <h2>❌ Error</h2>
                    <p>No ha sido posible reclamar la recompensa.</p>
                `;

            }

            await refreshUI(profile);

            clearUrlParams();

        }

        // =========================
        // Invocar
        // =========================

        document
            .getElementById("summonButton")
            .addEventListener("click", async () => {

                const result = await summon(
                    DEFAULT_BANNER,
                    profile
                );

                if (!result.success) {

                    if (result.reason === "NO_TICKETS") {

                        document.getElementById("resultArea").innerHTML = `
                            <h2>No tienes tickets disponibles</h2>
                            <p>Vuelve mañana para conseguir más.</p>
                        `;

                    }

                    if (result.reason === "COLLECTION_COMPLETE") {

                        document.getElementById("resultArea").innerHTML = `
                            <h2>¡Colección completada!</h2>
                        `;

                    }

                    return;

                }

                document.getElementById("resultArea").innerHTML =
                    renderSummonResult(
                        result.card
                    );

                await refreshUI(profile);

            });

    });

});