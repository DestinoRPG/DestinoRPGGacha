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

import { addCardNews } from "./ui/news.js";

import { COLLECTIONS } from "./data/collections.js";



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

await new Promise(resolve =>
    setTimeout(resolve, 1000)
);

resultArea.innerHTML =
    renderSummonResult(
        result.card
    );

const flip =
    document.getElementById(
        "summonFlip"
    );


const flash =
    document.getElementById(
        "summonFlash"
    );

setTimeout(() => {

    flash?.classList.add("active");

    flip?.classList.add("shake");

}, 300);

setTimeout(() => {

    flash?.classList.remove("active");

    flip?.classList.remove("shake");

    flip?.classList.add("opened");

    initializeCardEvents(
        [result.card],
        profile
    );

    const summonCard =
        flip?.querySelector(".summon-card");

    if (summonCard) {

        summonCard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    summonCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rx =
                    (y / rect.height - .5) * -18;

                const ry =
                    (x / rect.width - .5) * 18;

                summonCard.style.transform =
                    `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;

            }
        );

        summonCard.addEventListener(
            "mouseleave",
            () => {

                summonCard.style.transform = "";

            }
        );

    }

    summonButton.disabled = false;

    summonButton.classList.remove(
        "summoning"
    );

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