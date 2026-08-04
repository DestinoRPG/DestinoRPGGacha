import { createUI } from "./ui.js";

import { renderUser } from "./ui/layout.js";
import { renderSummonResult } from "./ui/summon.js";

import { login, observeUser } from "./firebase/auth.js";

import { createOrLoadUser } from "./services/userService.js";
import { summon } from "./services/gachaService.js";

import { DEFAULT_BANNER } from "./config.js";

import { refreshUI } from "./ui/refresh.js";

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
// Recompensas pendientes
// =========================

if (hasPendingReward()) {

    const { card } = getUrlParams();

    console.log(
        "Recompensa pendiente para:",
        card
    );

    clearUrlParams();

}

// =========================
// Dibujar interfaz
// =========================

document.getElementById("userArea").innerHTML =
    renderUser();

await refreshUI(profile);

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