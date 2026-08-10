let newsItems = [

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


/* =======================================================
   RECOMPENSA DIARIA
======================================================= */

function renderDailyReward(profile) {

    if (!profile) {

        return "";

    }


    let available = true;

    let remaining = 0;


    if (profile.lastDailyReward) {

        const lastReward =
            profile.lastDailyReward.toDate
                ? profile.lastDailyReward.toDate()
                : new Date(
                    profile.lastDailyReward
                );


        const nextReward =
            lastReward.getTime()
            + (24 * 60 * 60 * 1000);


        remaining =
            nextReward -
            Date.now();


        if (remaining > 0) {

            available = false;

        }

    }


    // =================================================
    // RECOMPENSA DISPONIBLE
    // =================================================

    if (available) {

        return `

            <div class="daily-reward-news">

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


    // =================================================
    // RECOMPENSA NO DISPONIBLE
    // =================================================

    const totalSeconds =
        Math.ceil(
            remaining / 1000
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


    return `

        <div class="daily-reward-news">

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

                ${String(hours).padStart(2, "0")}:
                ${String(minutes).padStart(2, "0")}:
                ${String(seconds).padStart(2, "0")}

            </div>

        </div>

    `;

}


/* =======================================================
   RENDERIZAR NOTICIA ACTUAL
======================================================= */

export function renderNews(profile) {

    const news =
        newsItems[currentNews];


    console.log(
        "Daily reward:",
        profile?.lastDailyReward
    );


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


                ${renderDailyReward(profile)}


                <div class="news-standard-content">

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
   EVENTOS DE LAS FLECHAS
======================================================= */

export function initializeNews(profile) {

    const newsArea =
        document.getElementById("newsArea");


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

            currentNews--;


            if (
                currentNews < 0
            ) {

                currentNews =
                    newsItems.length - 1;

            }


            updateNews(profile);

        };

    }


    if (next) {

        next.onclick = () => {

            currentNews++;


            if (
                currentNews >=
                newsItems.length
            ) {

                currentNews = 0;

            }


            updateNews(profile);

        };

    }


    initializeDailyCountdown();

}


/* =======================================================
   CONTADOR DE RECOMPENSA DIARIA
======================================================= */

function initializeDailyCountdown() {

    const countdown =
        document.getElementById(
            "dailyRewardCountdown"
        );


    if (!countdown) {

        return;

    }


    const interval =
        setInterval(() => {

            const current =
                document.getElementById(
                    "dailyRewardCountdown"
                );


            if (!current) {

                clearInterval(interval);

                return;

            }


            const parts =
                current.textContent
                    .trim()
                    .split(":")
                    .map(Number);


            if (
                parts.length !== 3
            ) {

                clearInterval(interval);

                return;

            }


            let totalSeconds =
                (parts[0] * 3600)
                + (parts[1] * 60)
                + parts[2];


            totalSeconds--;


            if (
                totalSeconds <= 0
            ) {

                current.textContent =
                    "00:00:00";

                clearInterval(interval);

                return;

            }


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


            current.textContent =

                String(hours)
                    .padStart(2, "0")
                + ":"
                +
                String(minutes)
                    .padStart(2, "0")
                + ":"
                +
                String(seconds)
                    .padStart(2, "0");

        }, 1000);

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


    const profile =
        window.currentProfile;


    const newNews =
        renderNews(profile);


    newsArea.outerHTML =
        newNews;


    initializeNews();

}