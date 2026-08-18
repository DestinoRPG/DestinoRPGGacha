import { renderModal } from "./modal.js";


export function initializeCardEvents(cards, profile) {


    const modalArea =
        document.getElementById(
            "modalArea"
        );


    if (!modalArea) {

        console.warn(
            "No existe modalArea"
        );

        return;

    }


    document
        .querySelectorAll(".card")
        .forEach(cardElement => {


            cardElement.onclick =
                () => {


                    const card =
                        cards.find(
                            c =>
                            c.id ===
                            cardElement.dataset.card
                        );


                    if (!card) {

                        return;

                    }


                    const owned =
                        profile.ownedCards.includes(
                            card.id
                        );


                    modalArea.innerHTML =
                        renderModal(
                            card,
                            owned
                        );


                    // -------------------------
                    // Cerrar con la X
                    // -------------------------

                    const closeButton =
                        document.getElementById(
                            "closeModal"
                        );


                    if (closeButton) {

                        closeButton.onclick =
                            () => {

                                modalArea.innerHTML =
                                    "";

                            };

                    }


                    // -------------------------
                    // Cerrar haciendo clic fuera
                    // de la carta
                    // -------------------------

                    const modalOverlay =
                        modalArea.querySelector(
                            ".modal-overlay"
                        );


                    if (modalOverlay) {

                        modalOverlay.onclick =
                            event => {

                                if (
                                    event.target ===
                                    modalOverlay
                                ) {

                                    modalArea.innerHTML =
                                        "";

                                }

                            };

                    }


                };


        });


}