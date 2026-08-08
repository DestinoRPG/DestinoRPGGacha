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
   RENDERIZAR NOTICIA ACTUAL
======================================================= */

export function renderNews() {

    const news =
        newsItems[currentNews];


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
   EVENTOS DE LAS FLECHAS
======================================================= */

export function initializeNews() {

    const newsArea =
        document.getElementById("newsArea");

    if (!newsArea) {
        return;
    }


    const previous =
        newsArea.querySelector(".news-prev");

    const next =
        newsArea.querySelector(".news-next");


    if (previous) {

        previous.onclick = () => {

            currentNews--;

            if (currentNews < 0) {

                currentNews =
                    newsItems.length - 1;

            }


            updateNews();

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


            updateNews();

        };

    }

}


/* =======================================================
   ACTUALIZAR NOTICIA
======================================================= */

function updateNews() {

    const newsArea =
        document.getElementById("newsArea");


    if (!newsArea) {
        return;
    }


    const newNews =
        renderNews();


    newsArea.outerHTML =
        newNews;


    initializeNews();

}
