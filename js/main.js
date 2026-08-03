import { createUI } from "./ui.js";

import { renderUser } from "./ui/layout.js";
import { renderBanner } from "./ui/banner.js";
import { renderSummonResult } from "./ui/summon.js";
import { renderCollection } from "./ui/collection.js";

import { login, observeUser } from "./firebase/auth.js";

import { createOrLoadUser } from "./services/userService.js";
import { summon } from "./services/gachaService.js";
import { getAvailableBannerCards } from "./services/bannerService.js";
import { getAllCards } from "./services/cardService.js";

import { DEFAULT_BANNER } from "./config.js";

import { initializeCardEvents } from "./ui/events.js";

window.addEventListener("DOMContentLoaded", () => {

    createUI();

    document
        .getElementById("loginButton")
        .addEventListener("click", async () => {

            try {
                await login();
            } catch (error) {
                console.error(error);
            }

        });

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

        // -------------------------
        // Cargar usuario
        // -------------------------

        const profile = await createOrLoadUser(user);

        document.getElementById("userArea").innerHTML =
            renderUser(profile);

        // -------------------------
        // Banner
        // -------------------------

        const availableCards =
            await getAvailableBannerCards(
                DEFAULT_BANNER,
                profile
            );

        document.getElementById("bannerArea").innerHTML =
            renderBanner(
                "Hall of Fame",
                availableCards
            );

        // -------------------------
        // Colección
        // -------------------------

        let allCards = await getAllCards();

        document.getElementById("collectionArea").innerHTML =
            renderCollection(
                allCards,
                profile
            );

        initializeCardEvents(allCards);

        // -------------------------
        // Invocar
        // -------------------------

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

                allCards = await getAllCards();

                document.getElementById("collectionArea").innerHTML =
                    renderCollection(
                        allCards,
                        profile
                    );

                initializeCardEvents(allCards);

            });

    });

});