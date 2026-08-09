import { createUI } from "./ui.js";

import {
    login,
    observeUser
} from "./firebase/auth.js";

import {
    createOrLoadUser
} from "./services/userService.js";

import {
    refreshUI,
    setView
} from "./ui/refresh.js";

import {
    claimCardReward,
    claimDailyReward
} from "./services/rewardService.js";

import {
    getUrlParams,
    hasPendingReward,
    clearUrlParams
} from "./services/urlService.js";

import {
    summon
} from "./services/gachaService.js";

import {
    renderSummonResult,
    renderSummonLoading
} from "./ui/summon.js";

import {
    DEFAULT_BANNER
} from "./config.js";

import {
    initializeCardEvents
} from "./ui/events.js";

import {
    addCardNews,
    revealCardNews,
    renderNews
} from "./ui/news.js";

import { COLLECTIONS } from "./data/collections.js";

import {
    claimAnniversaryReward
} from "./services/userService.js";



window.addEventListener(

    "DOMContentLoaded",

    () => {

        createUI();


        observeUser(

            async (user) => {


                // =========================
                // USUARIO NO LOGUEADO
                // =========================

                if (!user) {


                    document
                        .getElementById("userArea")
                        .innerHTML = `

                            <button id="loginButton">

                                Iniciar sesión

                            </button>

                        `;


                    document
                        .getElementById("loginButton")
                        .addEventListener(
                            "click",
                            login
                        );


                    return;

                }



                // =========================
                // USUARIO LOGUEADO
                // =========================

                const profile =
                    await createOrLoadUser(user);


                document
                    .getElementById("userArea")
                    .innerHTML = "";


                async function drawCurrentView() {

                    await refreshUI(profile);


// -------------------------
// Botón Inicio / Colección
// -------------------------

const homeButton =
    document.getElementById(
        "homeButton"
    );

const collectionButton =
    document.getElementById(
        "collectionButton"
    );

if (homeButton) {

    homeButton.onclick =
        async () => {

            setView("home");

            await drawCurrentView();

        };

}

if (collectionButton) {

    collectionButton.onclick =
        async () => {

            setView("collection");

            await drawCurrentView();

        };

}


                    // -------------------------
                    // Banner de invocación
                    // -------------------------

                    const summonButton =
                        document.getElementById(
                            "summonButton"
                        );


                    if (summonButton) {


                        summonButton.onclick =
                            async () => {
                                
                                summonButton.disabled = true;

                                summonButton.classList.add(
                                "summoning"
                                );

                                const result =
                                    await summon(

                                        DEFAULT_BANNER,

                                        profile

                                    );


if (!result.success) {

    summonButton.disabled = false;

    summonButton.classList.remove(
        "summoning"
    );

    if (
        result.reason ===
        "NO_TICKETS"
    ) {

        document
            .getElementById("resultArea")
            .innerHTML = `

                <h2>

                    No tienes tickets disponibles

                </h2>

                <p>

                    Vuelve mañana para conseguir más.

                </p>

            `;

        return;

    }

    if (
        result.reason ===
        "COLLECTION_COMPLETE"
    ) {

        document
            .getElementById("resultArea")
            .innerHTML = `

                <h2>

                    ¡Colección completada!

                </h2>

            `;

        return;

    }

}

const collection =
    COLLECTIONS.find(
        item =>
            item.id ===
            result.card.collection
    );

if (collection) {

    addCardNews(
        result.card,
        collection.name
    );

}


await drawCurrentView();

const resultArea =
    document.getElementById(
        "resultArea"
    );

resultArea.innerHTML =
    renderSummonLoading();

resultArea.scrollIntoView({

    behavior: "smooth",
    block: "center"

});


// =========================================================
// Esperar a que termine la invocación
// =========================================================

await new Promise(resolve =>
    setTimeout(resolve, 1000)
);


// =========================================================
// Mostrar carta obtenida
// =========================================================

const completionReward =
    result.completionRewards?.[0] ?? null;


resultArea.innerHTML =
    renderSummonResult(
        result.card,
        completionReward
    );


const flip =
    document.getElementById(
        "summonFlip"
    );

const flash =
    document.getElementById(
        "summonFlash"
    );


// =========================================================
// Animación de aparición
// =========================================================

setTimeout(() => {

    flash?.classList.add(
        "active"
    );

    flip?.classList.add(
        "shake"
    );

}, 300);


// =========================================================
// Revelar carta normal
// =========================================================

setTimeout(() => {

    flash?.classList.remove(
        "active"
    );

    flip?.classList.remove(
        "shake"
    );

    flip?.classList.add(
        "opened"
    );


    revealCardNews();


    const newsArea =
        document.getElementById(
            "newsArea"
        );


    if (newsArea) {

        newsArea.outerHTML =
            renderNews();

    }


    initializeCardEvents(
        [result.card],
        profile
    );


    const summonCard =
        flip?.querySelector(
            ".summon-card"
        );


    if (summonCard) {

        summonCard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    summonCard.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rx =
                    (
                        y /
                        rect.height -
                        .5
                    ) * -18;


                const ry =
                    (
                        x /
                        rect.width -
                        .5
                    ) * 18;


                summonCard.style.transform =
                    `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;

            }
        );


        summonCard.addEventListener(
            "mouseleave",
            () => {

                summonCard.style.transform =
                    "";

            }
        );

    }


// =========================================================
// Si NO hay recompensa de colección,
// terminamos aquí.
// =========================================================

    if (!completionReward) {

        summonButton.disabled =
            false;

        summonButton.classList.remove(
            "summoning"
        );

        return;

    }


// =========================================================
// Hay recompensa de colección
// =========================================================

// Esperamos un poco para que el usuario
// vea primero la carta que completó la colección.

setTimeout(() => {

    // Quitamos completamente la animación
    // anterior de la carta obtenida.

    resultArea.innerHTML = "";


    // Pequeña pausa para separar visualmente
    // las dos revelaciones.

    setTimeout(() => {

        resultArea.innerHTML = `

            <div class="completion-reward-reveal">

                <div class="completion-reward-title">

                    ✦ COLECCIÓN COMPLETADA ✦

                </div>

                <div class="completion-reward-subtitle">

                    Has desbloqueado una carta especial

                </div>

                <div class="completion-reward-card">

                    ${renderCard(
                        completionReward,
                        true
                    )}

                </div>

            </div>

        `;


        initializeCardEvents(
            [completionReward],
            profile
        );


        // Actualizamos el resto de la interfaz
        // sin borrar la pantalla de recompensa.

        setTimeout(() => {

            drawCurrentView();

        }, 100);


        summonButton.disabled =
            false;

        summonButton.classList.remove(
            "summoning"
        );

    }, 250);


}, 1800);


}, 1200);

                        };

                }

            }


            setView("home");

            await drawCurrentView();



                /*
                    RECOMPENSA DIARIA
                */

                const params =
                    getUrlParams();
                                    if (
                    params.reward === "daily"
                ) {


                    const result =
                        await claimDailyReward(
                            profile
                        );


                    document
                        .getElementById("resultArea")
                        .innerHTML = result.success

                            ? `

                                <h2>

                                    🎁 ¡Ticket diario conseguido!

                                </h2>

                                <p>

                                    Has recibido
                                    <strong>1 ticket</strong>.

                                </p>

                            `

                            : `

                                <h2>

                                    📅 Ticket diario

                                </h2>

                                <p>

                                    Ya has reclamado
                                    el ticket de hoy.

                                </p>

                            `;


                    await drawCurrentView();


                    clearUrlParams();

                }

                                else if (
                    params.reward ===
                    "anniversary14"
                ) {


                    const result =
                        await claimAnniversaryReward(
                            profile
                        );


                    if (
                        result.success
                    ) {


                        document
                            .getElementById("resultArea")
                            .innerHTML = `

                                <h2>

                                    🎉 ¡Recompensa del
                                    14.º aniversario!

                                </h2>

                                <p>

                                    Has recibido una
                                    <strong>carta especial</strong>
                                    y
                                    <strong>1 ticket</strong>.

                                </p>

                            `;

                    }


                    else if (
                        result.reason ===
                        "ALREADY_CLAIMED"
                    ) {


                        document
                            .getElementById("resultArea")
                            .innerHTML = `

                                <h2>

                                    ℹ️ Recompensa del
                                    14.º aniversario

                                </h2>

                                <p>

                                    Ya habías reclamado
                                    esta recompensa.

                                </p>

                            `;

                    }


                    else {


                        document
                            .getElementById("resultArea")
                            .innerHTML = `

                                <h2>

                                    ❌ Error

                                </h2>

                                <p>

                                    No se pudo reclamar
                                    la recompensa.

                                </p>

                            `;

                    }


                    await drawCurrentView();


                    clearUrlParams();

                }


                else if (
                    hasPendingReward()
                ) {


                    const result =
                        await claimCardReward(

                            profile,

                            params.card

                        );


                    if (
                        result.success
                    ) {


                        document
                            .getElementById("resultArea")
                            .innerHTML = `

                                <h2>

                                    🎁 ¡Recompensa conseguida!

                                </h2>

                                <p>

                                    Has recibido
                                    <strong>1 ticket</strong>.

                                </p>

                            `;

                    }


                    else if (
                        result.reason ===
                        "ALREADY_CLAIMED"
                    ) {


                        document
                            .getElementById("resultArea")
                            .innerHTML = `

                                <h2>

                                    ℹ️ Recompensa

                                </h2>

                                <p>

                                    Ya habías reclamado
                                    esta recompensa.

                                </p>

                            `;

                    }


                    else if (
                        result.reason ===
                        "CARD_NOT_OWNED"
                    ) {


                        document
                            .getElementById("resultArea")
                            .innerHTML = `

                                <h2>

                                    🔒 Carta no obtenida

                                </h2>

                                <p>

                                    Necesitas conseguir
                                    esta carta antes.

                                </p>

                            `;

                    }


                    else {


                        document
                            .getElementById("resultArea")
                            .innerHTML = `

                                <h2>

                                    ❌ Error

                                </h2>

                                <p>

                                    No se pudo reclamar
                                    la recompensa.

                                </p>

                            `;

                    }


                    await drawCurrentView();


                    clearUrlParams();

                }


            }

        );

    }

);