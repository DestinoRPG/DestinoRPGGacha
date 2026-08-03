import { renderBanner } from "./banner.js";
import { renderCollection } from "./collection.js";
import { renderCollectionProgress } from "./profile.js";

import { initializeCardEvents } from "./events.js";
import { DEFAULT_BANNER } from "../config.js";

import { getAllCards } from "../services/cardService.js";
import { getAvailableBannerCards } from "../services/bannerService.js";

import {
    renderProfile,
    renderCollectionProgress
} from "./profile.js";

export async function refreshUI(profile) {

    const allCards = await getAllCards();

    const availableCards =
        await getAvailableBannerCards(
            DEFAULT_BANNER,
            profile
        );

const progress = renderCollectionProgress(
    "Salón de la Fama",
    profile.ownedCards.length,
    allCards.length
);

document.getElementById("profileArea").innerHTML =
    renderProfile(
        profile,
        progress
    );

    document.getElementById("bannerArea").innerHTML =
        renderBanner(
            "Salón de la Fama",
            availableCards
        );

    document.getElementById("collectionArea").innerHTML =
        renderCollection(
            allCards,
            profile
        );

    initializeCardEvents(allCards);

}