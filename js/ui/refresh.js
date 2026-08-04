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
            renderHome(profile);


        const resultArea =
            document.getElementById("resultArea");


        if (resultArea) {

            resultArea.innerHTML = "";

        }


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


    }


}