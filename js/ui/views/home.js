import { renderBanner } from "../banner.js";
import {
    renderProfile,
    renderCollectionProgress
} from "../profile.js";


export function initializeHome(profile) {

    const button =
        document.getElementById(
            "summonButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        async () => {


            const { summon } =
                await import(
                    "../../services/gachaService.js"
                );


            const { DEFAULT_BANNER } =
                await import(
                    "../../config.js"
                );


            const { renderSummonResult } =
                await import(
                    "../summon.js"
                );



            const result =
                await summon(
                    DEFAULT_BANNER,
                    profile
                );



            if (!result.success) {


                if (
                    result.reason ===
                    "NO_TICKETS"
                ) {

                    document
                        .getElementById("resultArea")
                        .innerHTML = `

                            <h2>
                                No tienes tickets
                            </h2>

                            <p>
                                Consigue más para seguir invocando.
                            </p>

                        `;

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

                }


                return;

            }



            document
                .getElementById("resultArea")
                .innerHTML =
                    renderSummonResult(
                        result.card
                    );


            button.textContent =
                `🎫 Invocar (${profile.tickets})`;
                
if (profile.tickets <= 0) {

    button.disabled = true;

}

        }
    );

}



export function initializeHome() {

    // La inicialización del botón
    // de invocación se gestiona en main.js.
    //
    // Este espacio queda reservado
    // para futuros eventos propios
    // de la pantalla principal.

}