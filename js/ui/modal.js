import { COLLECTIONS } from "../data/collections.js";


export function renderModal(
    card,
    owned = true
) {


    const collection =
        COLLECTIONS.find(
            c =>
            c.id === card.collection
        );



    const collectionName =
        collection

            ? `${collection.icon} ${collection.name}`

            :

            card.collection ||
            "Colección desconocida";





    /*
        CARTA BLOQUEADA
    */


    if (!owned) {


        return `


            <div class="modal-overlay">


                <div class="modal locked-modal">


                    <button id="closeModal">

                        ✕

                    </button>





                    <img

                        class="locked-image"

                        src="images/card-back.webp"

                        alt="Carta sin descubrir"

                    >





                    <div class="locked-icon">

                        🔒

                    </div>





                    <h2 class="locked-title">

                        Carta desconocida

                    </h2>





                    <div class="locked-number">

                        Nº ${
                            String(card.number)
                            .padStart(3,"0")
                        }

                    </div>





                    <div class="locked-collection">

                        ${collectionName}

                    </div>





                    <p class="locked-description">

                        Todavía no has conseguido
                        esta carta.

                        Invoca en los banners para
                        descubrir su ilustración,
                        historia y artículos
                        relacionados.

                    </p>





                    <div class="locked-hint">

                        💡 Sigue ampliando tu colección
                        para desbloquearla.

                    </div>




                </div>


            </div>


        `;


    }






    /*
        CARTA DESBLOQUEADA
    */


    const articles =
        (card.articles ?? [])

        .map(article => `


            <a

                class="article-link"

                href="${article.url}"

                target="_blank"

                rel="noopener noreferrer"

            >

                <span>

                    ${article.title}

                </span>


            </a>


        `)

        .join("");





    return `



        <div class="modal-overlay">





            <div class="modal">





                <button id="closeModal">

                    ✕

                </button>







                <img

                    src="${card.image}"

                    alt="${card.title}"

                >







                <h2>

                    ${card.title}

                </h2>







                <div class="card-info">



                    <strong>

                        Número

                    </strong>

                    <span>

                        Nº ${
                            String(card.number)
                            .padStart(3,"0")
                        }

                    </span>





                    <strong>

                        Colección

                    </strong>


                    <span>

                        ${collectionName}

                    </span>





                    ${
                        card.series

                        ?

                        `

                        <strong>

                            Saga

                        </strong>


                        <span>

                            ${card.series}

                        </span>

                        `

                        :

                        ""

                    }





                    ${
                        card.developer

                        ?

                        `

                        <strong>

                            Desarrolladora

                        </strong>


                        <span>

                            ${card.developer}

                        </span>

                        `

                        :

                        ""

                    }





                    ${
                        card.releaseYear

                        ?

                        `

                        <strong>

                            Lanzamiento

                        </strong>


                        <span>

                            ${card.releaseYear}

                        </span>

                        `

                        :

                        ""

                    }



                </div>







                ${
                    card.description

                    ?

                    `

                    <p class="card-description">

                        ${card.description}

                    </p>

                    `

                    :

                    ""

                }








                ${
                    card.articles?.length

                    ?

                    `

                    <h3>

                        Artículos relacionados

                    </h3>



                    <div class="article-list">

                        ${articles}

                    </div>


                    `

                    :

                    ""

                }







            </div>





        </div>



    `;


}