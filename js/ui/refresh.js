import { initializeCardEvents } from "./events.js";

import {
    renderHome,
    initializeHome
} from "./views/home.js";

import {
    renderCollectionView
} from "./views/collection.js";

import {
    getAllCards
} from "../services/cardService.js";


let currentView = "home";


export function setView(view) {

    currentView = view;

    document
        .querySelectorAll(".nav-button")
        .forEach(button => {

            button.classList.remove("active");

        });

    const activeButton =
        view === "home"
            ? document.getElementById("homeButton")
            : document.getElementById("collectionButton");

    if (activeButton) {

        activeButton.classList.add("active");

    }

}


export async function refreshUI(profile) {

    const allCards =
        await getAllCards();

    profile.totalCards =
        allCards.length;

    const viewArea =
        document.getElementById(
            "viewArea"
        );

    if (!viewArea) {

        return;

    }


if (currentView === "home") {

    viewArea.innerHTML =
        await renderHome(profile);

    initializeHome(profile);

    return;

}


    if (currentView === "collection") {

        viewArea.innerHTML =
            renderCollectionView(
                allCards,
                profile
            );

        initializeCardEvents(
            allCards,
            profile
        );

        // =========================
// Colecciones desplegables
// =========================

document
    .querySelectorAll(".collection-header")
    .forEach(header => {

        const section =
            header.closest(
                ".collection-section"
            );

        const grid =
            section.querySelector(
                ".collection-grid"
            );

        const toggle =
            header.querySelector(
                ".collection-toggle"
            );


        const toggleCollection =
            () => {

                const isOpen =
                    section.classList.contains(
                        "open"
                    );


                section.classList.toggle(
                    "open",
                    !isOpen
                );


                header.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


                if (toggle) {

                    toggle.innerHTML =
                        !isOpen
                            ? `<i class="fa-solid fa-chevron-up"></i>`
                            : `<i class="fa-solid fa-chevron-down"></i>`;

                }

            };


        header.addEventListener(
            "click",
            toggleCollection
        );


        header.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleCollection();

                }

            }
        );

    });

        // =========================
        // Botones del índice
        // =========================

        document
            .querySelectorAll(
                ".collection-jump"
            )
            .forEach(button => {

                button.onclick = () => {

                    const target =
                        document.getElementById(
                            button.dataset.target
                        );

                    if (!target) {

                        return;

                    }

                    target.scrollIntoView({

                        behavior: "smooth",
                        block: "start"

                    });

                    target.classList.add(
                        "collection-highlight"
                    );

                    setTimeout(() => {

                        target.classList.remove(
                            "collection-highlight"
                        );

                    }, 800);

                };

            });

        // =========================
        // Botón subir arriba
        // =========================

        let backToTop =
            document.getElementById(
                "backToTop"
            );

        if (!backToTop) {

            document.body.insertAdjacentHTML(

                "beforeend",

                `

                <button

                    id="backToTop"

                    title="Volver arriba"

                >

                    ▲

                </button>

                `

            );

            backToTop =
                document.getElementById(
                    "backToTop"
                );

            window.addEventListener(

                "scroll",

                () => {

                    backToTop.classList.toggle(

                        "visible",

                        window.scrollY > 400

                    );

                }

            );

            backToTop.onclick = () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            };

        }

    }

}