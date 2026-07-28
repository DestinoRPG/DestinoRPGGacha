import { createUI } from "./ui.js";
import { login, observeUser } from "./firebase/auth.js";
import { createOrLoadUser } from "./services/userService.js";
import { getEnabledEvents } from "./services/eventService.js";
import { getAvailableCards } from "./services/gachaService.js";

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

        // Crear el usuario si es la primera vez
        const profile = await createOrLoadUser(user);
const availableCards = await getAvailableCards(
    "hall_of_fame",
    profile.ownedCards
);

console.log("Cartas disponibles:", availableCards);

        // Mostrar datos del perfil
        document.getElementById("userArea").innerHTML = `
            <img src="${profile.photoURL}" width="40" style="border-radius:50%;vertical-align:middle;">
            <span>${profile.displayName}</span>
            <span>💎 ${profile.gems}</span>
            <span>🎫 ${profile.tickets}</span>
        `;

    });

});