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
   RECOMPENSA DIARIA
======================================================= */

/* -------------------------------------------------------
   OBTENER ÚLTIMO MOMENTO DE RECLAMACIÓN
------------------------------------------------------- */

function getLastDailyRewardTime(profile) {

    if (
        !profile ||
        !profile.lastDailyReward
    ) {

        return null;

    }


    const lastReward =
        profile.lastDailyReward;


    // Timestamp de Firestore

    if (
        typeof lastReward === "object" &&
        typeof lastReward.toMillis === "function"
    ) {

        return lastReward.toMillis();

    }


    // Timestamp con toDate()

    if (
        typeof lastReward === "object" &&
        typeof lastReward.toDate === "function"
    ) {

        return lastReward.toDate().getTime();

    }


    // Número

    if (
        typeof lastReward === "number"
    ) {

        return lastReward;

    }


    // String / fecha

    const parsed =
        new Date(
            lastReward
        ).getTime();


    if (
        Number.isNaN(parsed)
    ) {

        return null;

    }


    return parsed;

}


/* -------------------------------------------------------
   OBTENER DÍA EN MADRID
------------------------------------------------------- */

function getSpainDay(date) {

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

}


/* -------------------------------------------------------
   OBTENER PRÓXIMA MEDIANOCHE DE MADRID
------------------------------------------------------- */

function getNextMadridMidnight() {

    const now =
        new Date();


    const madridDate =
        getSpainDay(
            now
        );


    const [
        year,
        month,
        day
    ] =
        madridDate
            .split("-")
            .map(Number);


    /*
     * Buscamos la medianoche del día siguiente.
     *
     * No utilizamos:
     *
     * lastReward + 24 horas
     *
     * porque eso produciría exactamente el problema
     * que estamos intentando solucionar.
     *
     * Europe/Madrid se encarga automáticamente del
     * cambio entre UTC+1 y UTC+2.
     */

    const targetYear =
        year;

    const targetMonth =
        month;

    const targetDay =
        day + 1;


    /*
     * Tomamos una fecha UTC aproximada.
     */

    let timestamp =
        Date.UTC(
            targetYear,
            targetMonth - 1,
            targetDay,
            0,
            0,
            0,
            0
        );


    /*
     * Hacemos unas pocas iteraciones para ajustar
     * correctamente el offset de Madrid.
     *
     * Esto evita cualquier cálculo recursivo.
     */

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const parts =
            new Intl.DateTimeFormat(
                "en-US",
                {
                    timeZone: "Europe/Madrid",
                    timeZoneName: "longOffset"
                }
            ).formatToParts(
                new Date(
                    timestamp
                )
            );


        const offsetPart =
            parts.find(
                part =>
                    part.type === "timeZoneName"
            );


        if (
            !offsetPart
        ) {

            break;

        }


        const match =
            offsetPart.value.match(
                /GMT([+-])(\d{2}):(\d{2})/
            );


        if (
            !match
        ) {

            break;

        }


        const sign =
            match[1] === "+"
                ? 1
                : -1;


        const hours =
            Number(
                match[2]
            );


        const minutes =
            Number(
                match[3]
            );


        const offset =
            sign *
            (
                hours * 60 +
                minutes
            ) *
            60 *
            1000;


        timestamp =
            Date.UTC(
                targetYear,
                targetMonth - 1,
                targetDay,
                0,
                0,
                0,
                0
            )
            -
            offset;

    }


    return timestamp;

}


/* -------------------------------------------------------
   RENDER RECOMPENSA DIARIA
------------------------------------------------------- */

function renderDailyNews(profile) {

    const lastReward =
        getLastDailyRewardTime(
            profile
        );


    /*
     * Nunca ha reclamado la recompensa.
     */

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


    /*
     * Comparamos el día de la última reclamación
     * con el día actual en Madrid.
     */

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


    /*
     * Si estamos en otro día, está disponible.
     */

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


    /*
     * Todavía estamos en el mismo día.
     *
     * El contador va hasta la próxima medianoche
     * de Madrid.
     */

    const nextReward =
        getNextMadridMidnight();


    const remaining =
        nextReward -
        Date.now();


    /*
     * Seguridad por si justo hemos cruzado
     * la medianoche.
     */

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


    /*
     * Mostrar contador.
     */

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
   FORMATEAR CONTADOR
======================================================= */

function formatRemainingTime(
    milliseconds
) {

    const totalSeconds =
        Math.max(
            0,
            Math.ceil(
                milliseconds / 1000
            )
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    return (

        String(hours)
            .padStart(2, "0")

        + ":"

        + String(minutes)
            .padStart(2, "0")

        + ":"

        + String(seconds)
            .padStart(2, "0")

    );

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


    /*
     * Botón de recompensa diaria.
     */

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


    /*
     * Si estamos viendo la diaria,
     * iniciar contador.
     */

    if (
        newsItems[currentNews]?.type
        === "daily"
    ) {

        const countdown =
            newsArea.querySelector(
                "#dailyRewardCountdown"
            );


        /*
         * Solo iniciamos el contador si realmente
         * existe el elemento.
         *
         * Si aparece el botón de reclamar,
         * no hay contador que iniciar.
         */

        if (countdown) {

            startDailyCountdown();

        }

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


            /*
             * Si ya no existe, hemos cambiado
             * de noticia.
             */

            if (!countdown) {

                stopDailyCountdown();

                return;

            }


            /*
             * Comprobar si ya estamos en un nuevo día
             * de Madrid.
             */

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


            /*
             * Si ya es otro día, sustituimos el contador
             * por el botón.
             */

            if (
                lastRewardDay !== today
            ) {

                stopDailyCountdown();

                updateNews();

                return;

            }


            /*
             * Calcular SIEMPRE la próxima medianoche
             * de Madrid.
             */

            const nextReward =
                getNextMadridMidnight();


            const remaining =
                nextReward -
                Date.now();


            /*
             * Seguridad adicional.
             */

            if (
                remaining <= 0
            ) {

                stopDailyCountdown();

                updateNews();

                return;

            }


            countdown.textContent =
                formatRemainingTime(
                    remaining
                );

        };


    /*
     * Primera actualización inmediata.
     */

    updateCountdown();


    /*
     * Actualizar cada segundo.
     */

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
        dailyCountdownInterval !== null
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


        // -------------------------------------------------
        // La recompensa se ha concedido correctamente.
        //
        // Detenemos cualquier contador anterior.
        // -------------------------------------------------

        stopDailyCountdown();


        // -------------------------------------------------
        // Redibujar la noticia.
        //
        // Como ahora sabemos que se ha reclamado hoy,
        // renderDailyNews() mostrará el contador hasta
        // la próxima medianoche de Madrid.
        // -------------------------------------------------

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