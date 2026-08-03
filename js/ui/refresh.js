import { renderBanner } from "./banner.js";
import { renderCollection } from "./collection.js";
import { renderCollectionProgress } from "./profile.js";

import { initializeCardEvents } from "./events.js";

import { getAllCards } from "../services/cardService.js";
import { getAvailableBannerCards } from "../services/bannerService.js";

export async function refreshUI(profile) {

    const allCards = await getAllCards();

    const availableCards =
        await getAvailableBannerCards(
            DEFAULT_BANNER,
            profile
        );

    document.getElementById("profileProgress").innerHTML =
        renderCollectionProgress(
            "Salón de la Fama",
            profile.ownedCards.length,
            allCards.length
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