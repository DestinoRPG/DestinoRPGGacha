import {
    claimDailyReward
} from "../services/rewardService.js";


let newsItems = [

    {
    type: "daily"
    },

    {
        type: "info",

        title:
            "Nueva colección: Eventos",

        text:
            "Una nueva colección se incorpora al Gacha. ¡Consigue sus cartas y aumenta tu porcentaje de colección!"
    },


    {
        type: "info",

        title:
            "Los duplicados no tienen cabida",

        text:
            "Las cartas que ya posees no volverán a aparecer en tus invocaciones. ¡Cada tirada te acerca a completar tus colecciones!"
    },


    {
        type: "info",

        title:
            "Colecciona tus RPG favoritos",

        text:
            "Cada colección reúne cartas con información sobre el juego, su desarrollador y su año de lanzamiento."
    },


    {
        type: "info",

        title:
            "Nuevas colecciones en camino",

        text:
            "El catálogo de Destino RPG Gacha seguirá creciendo con nuevas colecciones y cartas."
    }

];


let currentNews = 0;

let currentProfile = null;

let dailyCountdownInterval = null;


/* =======================================================
   RENDER RECOMPENSA DIARIA
======================================================= */

function renderDailyNews(profile) {

    const lastReward =
        getLastDailyRewardTime(
            profile
        );


    // =====================================================
    // Nunca ha reclamado la recompensa
    // =====================================================

    if (
        lastReward === null
    ) {

        return `

            <div class="news-content">

                <div class="news-label">

                    RECOMPENSA DIARIA

                </div>


                <h2>

                    🎁 ¡Recompensa disponible!

                </h2>


                <p>

                    Ya puedes reclamar tu ticket diario.

                </p>


                <button
                    id="claimDailyRewardButton"
                    class="daily-reward-button"
                    type="button"
                >

                    RECLAMAR RECOMPENSA

                </button>

            </div>

        `;

    }


    // =====================================================
    // Obtener día actual en España
    // =====================================================

    const getSpainDay =
        date => {

            return new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Europe/Madrid",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(
                date
            );

        };


    const today =
        getSpainDay(
            new Date()
        );


    const lastRewardDay =
        getSpainDay(
            new Date(
                lastReward
            )
        );


    // =====================================================
    // Si el último reclamo fue otro día,
    // la recompensa ya está disponible.
    // =====================================================

    if (
        lastRewardDay !== today
    ) {

        return `

            <div class="news-content">

                <div class="news-label">

                    RECOMPENSA DIARIA

                </div>


                <h2>

                    🎁 ¡Recompensa disponible!

                </h2>


                <p>

                    Ya puedes reclamar tu ticket diario.

                </p>


                <button
                    id="claimDailyRewardButton"
                    class="daily-reward-button"
                    type="button"
                >

                    RECLAMAR RECOMPENSA

                </button>

            </div>

        `;

    }


    // =====================================================
    // Sigue siendo el mismo día.
    // Mostrar contador hasta la próxima medianoche.
    // =====================================================

    const nextReward =
        getNextMadridMidnight();


    const remaining =
        nextReward -
        Date.now();


    // =====================================================
    // Seguridad:
    // si por alguna razón ya hemos llegado a medianoche,
    // mostrar directamente la recompensa.
    // =====================================================

    if (
        remaining <= 0
    ) {

        return `

            <div class="news-content">

                <div class="news-label">

                    RECOMPENSA DIARIA

                </div>


                <h2>

                    🎁 ¡Recompensa disponible!

                </h2>


                <p>

                    Ya puedes reclamar tu ticket diario.

                </p>


                <button
                    id="claimDailyRewardButton"
                    class="daily-reward-button"
                    type="button"
                >

                    RECLAMAR RECOMPENSA

                </button>

            </div>

        `;

    }


    // =====================================================
    // Mostrar contador
    // =====================================================

    return `

        <div class="news-content">

            <div class="news-label">

                RECOMPENSA DIARIA

            </div>


            <h2>

                🎁 Próxima recompensa

            </h2>


            <p>

                Podrás reclamarla de nuevo en:

            </p>


            <div
                id="dailyRewardCountdown"
                class="daily-reward-countdown"
            >

                ${formatRemainingTime(
                    remaining
                )}

            </div>

        </div>

    `;

}


/* =======================================================
   RENDERIZAR NOTICIA ACTUAL
======================================================= */

export function renderNews(profile) {

    if (profile) {

        currentProfile =
            profile;

    }


    const news =
        newsItems[currentNews];


    // -----------------------------------------------
    // La recompensa diaria es una noticia del carrusel
    // -----------------------------------------------

    if (
        news.type === "daily"
    ) {

        return `

            <div
                id="newsArea"
                class="news-panel"
                data-news-index="${currentNews}"
            >

                <button
                    class="news-arrow news-prev"
                    aria-label="Noticia anterior"
                >

                    ‹

                </button>


                ${renderDailyNews(
                    currentProfile
                )}


                <button
                    class="news-arrow news-next"
                    aria-label="Siguiente noticia"
                >

                    ›

                </button>

            </div>

        `;

    }


    return `

        <div
            id="newsArea"
            class="news-panel"
            data-news-index="${currentNews}"
        >

            <button
                class="news-arrow news-prev"
                aria-label="Noticia anterior"
            >

                ‹

            </button>


            <div class="news-content">

                <div class="news-label">

                    NOTICIAS

                </div>


                <h2>

                    ${news.title}

                </h2>


                <p>

                    ${news.text}

                </p>

            </div>


            <button
                class="news-arrow news-next"
                aria-label="Siguiente noticia"
            >

                ›

            </button>

        </div>

    `;

}


/* =======================================================
   NUEVA CARTA CONSEGUIDA
======================================================= */

export function addCardNews(
    card,
    collectionName
) {

    newsItems.unshift({

        type: "card",

        card: card,

        collectionName:
            collectionName,

        revealed: false,

        title:
            "✨ ¡Nueva carta conseguida!",

        text:
            `
            Has obtenido una nueva carta
            de <strong>${collectionName}</strong>.
            `

    });


    currentNews = 0;

}


/* =======================================================
   REVELAR CARTA
======================================================= */

export function revealCardNews() {

    const news =
        newsItems[0];


    if (
        !news ||
        news.type !== "card"
    ) {

        return;

    }


    news.revealed = true;


    news.title =
        "✨ ¡Carta descubierta!";


    news.text =
        `
        Has conseguido
        <strong>${news.card.title}</strong>
        de la colección
        <strong>${news.collectionName}</strong>.
        `;

}

/* =======================================================
   NOTICIA ACTUAL
======================================================= */

export function getCurrentNews() {

    return newsItems[currentNews];

}


/* =======================================================
   INICIALIZAR NOTICIAS
======================================================= */

export function initializeNews(profile) {

    if (profile) {

        currentProfile =
            profile;

    }


    const newsArea =
        document.getElementById(
            "newsArea"
        );


    if (!newsArea) {

        return;

    }


    const previous =
        newsArea.querySelector(
            ".news-prev"
        );


    const next =
        newsArea.querySelector(
            ".news-next"
        );


    if (previous) {

        previous.onclick = () => {

            stopDailyCountdown();


            currentNews--;


            if (
                currentNews < 0
            ) {

                currentNews =
                    newsItems.length - 1;

            }


            updateNews();

        };

    }


    if (next) {

        next.onclick = () => {

            stopDailyCountdown();


            currentNews++;


            if (
                currentNews >=
                newsItems.length
            ) {

                currentNews = 0;

            }


            updateNews();

        };

    }


    // Botón de recompensa diaria.

    const claimButton =
        newsArea.querySelector(
            "#claimDailyRewardButton"
        );


    if (claimButton) {

        claimButton.onclick =
            () => {

                handleDailyReward();

            };

    }


    // Si estamos viendo la diaria,
    // iniciar su contador.

    if (
        newsItems[currentNews]?.type
        === "daily"
    ) {

        startDailyCountdown();

    }

}


/* =======================================================
   CONTADOR DE RECOMPENSA
======================================================= */

function startDailyCountdown() {

    stopDailyCountdown();


    const updateCountdown =
        () => {

            const countdown =
                document.getElementById(
                    "dailyRewardCountdown"
                );


            // -------------------------------------------------
            // Si ya no existe el contador, hemos cambiado
            // de noticia.
            // -------------------------------------------------

            if (!countdown) {

                stopDailyCountdown();

                return;

            }


            // -------------------------------------------------
            // Obtener el último reclamo.
            // -------------------------------------------------

            const lastReward =
                getLastDailyRewardTime(
                    currentProfile
                );


            if (
                lastReward === null
            ) {

                stopDailyCountdown();

                updateNews();

                return;

            }


            // -------------------------------------------------
            // Obtener día actual y día del último reclamo
            // usando SIEMPRE Europe/Madrid.
            // -------------------------------------------------

            const madridFormatter =
                new Intl.DateTimeFormat(
                    "en-CA",
                    {
                        timeZone: "Europe/Madrid",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }
                );


            const today =
                madridFormatter.format(
                    new Date()
                );


            const lastRewardDay =
                madridFormatter.format(
                    new Date(
                        lastReward
                    )
                );


            // -------------------------------------------------
            // Si ya estamos en otro día:
            //
            // LA RECOMPENSA ESTÁ DISPONIBLE.
            //
            // Dejamos de contar y reconstruimos la noticia.
            // -------------------------------------------------

            if (
                lastRewardDay !== today
            ) {

                stopDailyCountdown();

                updateNews();

                return;

            }


            // -------------------------------------------------
            // Seguimos en el mismo día.
            //
            // Calcular próxima medianoche de Madrid.
            // -------------------------------------------------

            const nextReward =
                getNextMadridMidnight();


            const remaining =
                nextReward -
                Date.now();


            // -------------------------------------------------
            // Seguridad adicional.
            // -------------------------------------------------

            if (
                remaining <= 0
            ) {

                stopDailyCountdown();

                updateNews();

                return;

            }


            // -------------------------------------------------
            // Actualizar solamente el contador.
            // -------------------------------------------------

            countdown.textContent =
                formatRemainingTime(
                    remaining
                );

        };


    // -------------------------------------------------------
    // Primera actualización inmediata.
    // -------------------------------------------------------

    updateCountdown();


    // -------------------------------------------------------
    // Actualizar cada segundo.
    // -------------------------------------------------------

    dailyCountdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


/* =======================================================
   DETENER CONTADOR
======================================================= */

function stopDailyCountdown() {

    if (
        dailyCountdownInterval
    ) {

        clearInterval(
            dailyCountdownInterval
        );

        dailyCountdownInterval =
            null;

    }

}


/* =======================================================
   RECLAMAR RECOMPENSA DIARIA
======================================================= */

async function handleDailyReward() {

    if (
        !currentProfile
    ) {

        return;

    }


    const button =
        document.getElementById(
            "claimDailyRewardButton"
        );


    if (button) {

        button.disabled = true;

        button.textContent =
            "RECLAMANDO...";

    }


    try {

        const result =
            await claimDailyReward(
                currentProfile
            );


        if (
            !result.success
        ) {

            console.warn(
                "No se pudo reclamar la recompensa diaria:",
                result.reason
            );


            updateNews();

            return;

        }


        // El objeto user ya ha sido actualizado
        // por claimDailyReward().

        currentProfile =
            currentProfile;


        updateNews();

    }

    catch (error) {

        console.error(
            "Error al reclamar recompensa diaria:",
            error
        );


        updateNews();

    }

}


/* =======================================================
   ACTUALIZAR NOTICIA
======================================================= */

function updateNews() {

    const newsArea =
        document.getElementById(
            "newsArea"
        );


    if (!newsArea) {

        return;

    }


    const newNews =
        renderNews(
            currentProfile
        );


    newsArea.outerHTML =
        newNews;


    initializeNews(
        currentProfile
    );

}