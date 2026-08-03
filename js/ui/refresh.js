import { renderBanner } from "./banner.js";
import { renderCollection } from "./collection.js";
import { renderCollectionProgress } from "./profile.js";

import { initializeCardEvents } from "./events.js";

import { getAllCards } from "../services/cardService.js";
import { getAvailableBannerCards } from "../services/bannerService.js";

import { DEFAULT_BANNER } from "../config.js";

export async function refreshUI(profile) {

    const allCards = await getAllCards();

    const availableCards =
        await getAvailableBannerCards(
            DEFAULT_BANNER,
            profile
        );

    document.getElementById("profileProgress").innerHTML =
        renderCollectionProgress(
            "Hall of Fame",
            profile.ownedCards.length,
            allCards.length
        );

    document.getElementById("bannerArea").innerHTML =
        renderBanner(
            "Hall of Fame",
            availableCards
        );

    document.getElementById("collectionArea").innerHTML =
        renderCollection(
            allCards,
            profile
        );

    initializeCardEvents(allCards);

}