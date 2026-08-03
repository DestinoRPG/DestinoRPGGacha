import { renderModal } from "./modal.js";

export function initializeCardEvents(cards) {

    document.querySelectorAll(".card").forEach(cardElement => {

        cardElement.addEventListener("click", () => {

            const card = cards.find(c =>
                c.id === cardElement.dataset.card
            );

            document.getElementById("modalArea").innerHTML =
                renderModal(card);

            document
                .getElementById("closeModal")
                .addEventListener("click", () => {

                    document.getElementById("modalArea").innerHTML = "";

                });

        });

    });

}