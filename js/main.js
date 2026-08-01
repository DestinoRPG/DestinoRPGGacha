import { createUI } from "./ui.js";
import { renderUser } from "./ui/layout.js";
import { renderBanner } from "./ui/banner.js";
import { renderSummonResult } from "./ui/summon.js";

import { login, observeUser } from "./firebase/auth.js";

import { createOrLoadUser } from "./services/userService.js";
import { summon } from "./services/gachaService.js";
import { getAvailableBannerCards } from "./services/bannerService.js";
import { getAllCards } from "./services/cardService.js";
import { renderCollection } from "./ui/collection.js";

import { DEFAULT_BANNER } from "./config.js";

window.addEventListener("DOMContentLoaded", () => {

    createUI();

    document
        .getElementById("loginButton")
        .addEventListener("click", async () => {

            try {
                await login();
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
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

        // Crear o cargar usuario
        const profile = await createOrLoadUser(user);

        // Mostrar perfil
        document.getElementById("userArea").innerHTML = renderUser(profile);

        // Obtener cartas disponibles
        const availableCards = await getAvailableBannerCards(
            DEFAULT_BANNER,
            profile
        );

        console.log("Cartas disponibles:", availableCards);

        // Mostrar banner
        document.getElementById("bannerArea").innerHTML =
            renderBanner(
                "Hall of Fame",
                availableCards
            );

           const allCards = await getAllCards();

document.getElementById("collectionArea").innerHTML =
    renderCollection(
        allCards,
        profile
    ); 

        // Evento del botón
        document
            .getElementById("summonButton")
            .addEventListener("click", async () => {

                const card = await summon(
                    DEFAULT_BANNER,
                    profile
                );

                if (!card) {
                    alert("¡Ya has completado este banner!");
                    return;
                }

                document.getElementById("resultArea").innerHTML =
                    renderSummonResult(card);

                console.log(card);

                const updatedCards = await getAllCards();

document.getElementById("collectionArea").innerHTML =
    renderCollection(
        updatedCards,
        profile
    );

            });

    });

});