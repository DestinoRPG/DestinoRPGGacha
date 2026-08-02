export function setupCollectionEvents(cards){

    document.querySelectorAll(".card").forEach(cardDiv=>{

        cardDiv.addEventListener("click",()=>{

            const id=cardDiv.dataset.card;

            const card=cards.find(c=>c.id===id);

            console.log(card);

        });

    });

}