let newsItems = [

    {
        type: "welcome",

        title:
            "Bienvenido a Destino RPG Gacha",

        text:
            "¡Consigue cartas, completa colecciones y descubre todas las recompensas!"
    },


    {
        type: "info",

        title:
            "Completa tus colecciones",

        text:
            "Consigue todas las cartas disponibles para completar cada colección."
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