import { serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getDocument,
    setDocument,
    updateDocument
} from "../firebase/firestore.js";

export async function createOrLoadUser(firebaseUser) {

    let user = await getDocument("users", firebaseUser.uid);

    if (!user) {

        user = {

            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,

            tickets: 10,

            ownedCards: [],

            claimedRewards: {},

            lastDailyReward: null,

            totalSummons: 0,
            cardsObtained: 0,
            dailyRewardsClaimed: 0,
            articleRewardsClaimed: 0,

            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()

        };

        await setDocument(
            "users",
            firebaseUser.uid,
            user
        );

    } else {

        await updateDocument(
            "users",
            firebaseUser.uid,
            {
                lastLogin: serverTimestamp()
            }
        );

        user = await getDocument(
            "users",
            firebaseUser.uid
        );

        // Compatibilidad con usuarios creados
        // antes de añadir estos campos.
        user.claimedRewards ??= {};
        user.lastDailyReward ??= null;
        user.ownedCards ??= [];
        user.tickets ??= 0;

        user.totalSummons ??= 0;
        user.cardsObtained ??= 0;
        user.dailyRewardsClaimed ??= 0;
        user.articleRewardsClaimed ??= 0;

    }

    return user;

}

export async function updateUser(uid, data) {

    await updateDocument(
        "users",
        uid,
        data
    );

}

export async function addCardToUser(user, cardId) {

    if (user.ownedCards.includes(cardId)) {

        return user;

    }

    const updatedCards = [
        ...user.ownedCards,
        cardId
    ].sort();

    const cardsObtained =
        (user.cardsObtained ?? 0) + 1;

    await updateUser(
        user.uid,
        {
            ownedCards: updatedCards,
            cardsObtained
        }
    );

    user.ownedCards = [...updatedCards];
    user.cardsObtained = cardsObtained;

    return user;

}