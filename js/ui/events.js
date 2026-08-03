import { renderModal } from "./modal.js";

export function initializeCardEvents(cards, profile) {

    document.querySelectorAll(".card").forEach(cardElement => {

        cardElement.addEventListener("click", () => {

            const card = cards.find(c =>
                c.id === cardElement.dataset.card
            );

            const owned = profile.ownedCards.includes(card.id);

            document.getElementById("modalArea").innerHTML =
                renderModal(card, owned);

            document
                .getElementById("closeModal")
                .addEventListener("click", () => {

                    document.getElementById("modalArea").innerHTML = "";

                });

        });

    });

}