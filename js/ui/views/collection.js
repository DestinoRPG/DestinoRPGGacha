import { renderCard } from "../card.js";


export function renderCollectionView(
    cards,
    profile
) {


    const owned =
        profile.ownedCards.length;


    const total =
        cards.length;



    const percentage =
        total === 0
            ? 0
            : Math.round(
                owned / total * 100
            );



    let html = `

        <section class="collection-view">


            <div class="collection-header">


                <div>

                    <h2 class="collection-title">

                        Salón de la Fama

                    </h2>


                    <p class="collection-subtitle">

                        ${owned}
                        de
                        ${total}
                        cartas descubiertas

                    </p>


                </div>



                <div class="collection-counter">

                    ${percentage}%

                </div>



            </div>



            <div class="collection-grid">

    `;



    for (const card of cards) {


        html += renderCard(

            card,

            profile.ownedCards.includes(
                card.id
            )

        );


    }



    html += `

            </div>


        </section>

    `;



    return html;


}