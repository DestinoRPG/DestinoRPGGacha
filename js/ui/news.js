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


export function renderNews() {

    const news =
        newsItems[currentNews];

    return `

        <div
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


export function addCardNews(card, collectionName) {

    newsItems.unshift({

        type: "card",

        title:
            "✨ ¡Nueva carta conseguida!",

        text:
            `Has conseguido <strong>${card.title}</strong>
            de la colección
            <strong>${collectionName}</strong>.`

    });


    currentNews = 0;

}