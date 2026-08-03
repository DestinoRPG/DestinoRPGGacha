import { createUI } from "./ui.js";

import { renderUser } from "./ui/layout.js";
import { renderSummonResult } from "./ui/summon.js";

import { login, observeUser } from "./firebase/auth.js";

import { createOrLoadUser } from "./services/userService.js";
import { summon } from "./services/gachaService.js";

import { refreshUI } from "./ui/refresh.js";

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
            renderUser(profile);

        await refreshUI(profile);

        // =========================
        // Invocar
        // =========================

        document
            .getElementById("summonButton")
            .addEventListener("click", async () => {

                const card = await summon(
                    DEFAULT_BANNER,
                    profile
                );

                if (!card) {

                    document.getElementById("resultArea").innerHTML = `
                        <h2>¡Colección completada!</h2>
                    `;

                    return;

                }

                document.getElementById("resultArea").innerHTML =
                    renderSummonResult(card);

                await refreshUI(profile);

            });

    });

});