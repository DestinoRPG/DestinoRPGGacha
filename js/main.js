import { createUI } from "./ui.js";

import { login, observeUser } from "./firebase/auth.js";

import { createOrLoadUser } from "./services/userService.js";

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


window.addEventListener(
    "DOMContentLoaded",
    () => {

        createUI();


        document
            .getElementById("loginButton")
            .addEventListener(
                "click",
                login
            );


        observeUser(
            async (user) => {


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



                const profile =
                    await createOrLoadUser(user);


                setView("home");


                await refreshUI(profile);



                /*
                    NAVEGACIÓN
                */


                document
                    .getElementById("homeButton")
                    .addEventListener(
                        "click",
                        async () => {

                            setView("home");

                            await refreshUI(profile);

                        }
                    );



                document
                    .getElementById("collectionButton")
                    .addEventListener(
                        "click",
                        async () => {

                            setView("collection");

                            await refreshUI(profile);

                        }
                    );





                /*
                    RECOMPENSA DIARIA
                */


                const params =
                    getUrlParams();



                if (
                    params.reward === "daily"
                ) {


                    const result =
                        await claimDailyReward(profile);



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



                    await refreshUI(profile);


                    clearUrlParams();

                }





                /*
                    RECOMPENSAS EXTERNAS
                */


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



                    await refreshUI(profile);


                    clearUrlParams();


                }


            }
        );

    }
);