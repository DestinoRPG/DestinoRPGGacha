import { serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getDocument,
    setDocument,
    updateDocument
} from "../firebase/firestore.js";

import {
    getCard,
    getCardsByCollection
} from "./cardService.js";

import { COLLECTIONS } from "../data/collections.js";


export async function createOrLoadUser(firebaseUser) {

    console.log("1️⃣ Antes de leer usuario");

    let user =
        await getDocument(
            "users",
            firebaseUser.uid
        );

    console.log("2️⃣ Usuario leído:", user);


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

    }

else {
console.log("3️⃣ Antes de actualizar lastLogin");
    await updateDocument(
        "users",
        firebaseUser.uid,
        {
            lastLogin: serverTimestamp()
        }
    );
console.log("4️⃣ lastLogin actualizado");
console.log("5️⃣ Antes de volver a leer usuario");
    user =
        await getDocument(
            "users",
            firebaseUser.uid
        );
console.log("6️⃣ Usuario vuelto a leer:", user);

    user.claimedRewards ??= {};
    user.lastDailyReward ??= null;
    user.ownedCards ??= [];
    user.tickets ??= 0;

    user.totalSummons ??= 0;
    user.cardsObtained ??= 0;
    user.dailyRewardsClaimed ??= 0;
    user.articleRewardsClaimed ??= 0;

}


// await checkCollectionCompletionRewards(
//     user
// );


return user;

}


export async function updateUser(
    uid,
    data
) {

    await updateDocument(
        "users",
        uid,
        data
    );

}


/**
 * Comprueba todas las colecciones que tienen
 * una recompensa por completarlas.
 *
 * Si una colección está completa y su carta
 * especial todavía no pertenece al usuario,
 * se añade automáticamente.
 */
export async function checkCollectionCompletionRewards(
    user
) {

    const newRewards = [];


    for (
        const collection
        of COLLECTIONS
    ) {

        if (
            !collection.enabled ||
            !collection.completionReward
        ) {

            continue;

        }


const collectionCards =
    (
        await getCardsByCollection(
            collection.id
        )
    ).filter(
        card =>
            !card.completionReward
    );


        // No podemos completar una colección
        // que no tenga cartas.

        if (
            collectionCards.length === 0
        ) {

            continue;

        }


        const completed =
            collectionCards.every(
                card =>
                    user.ownedCards.includes(
                        card.id
                    )
            );


        if (!completed) {

            continue;

        }


        const rewardId =
            collection.completionReward;


        // Ya tiene la recompensa.

        if (
            user.ownedCards.includes(
                rewardId
            )
        ) {

            continue;

        }


        const rewardCard =
            await getCard(
                rewardId
            );


        if (!rewardCard) {

            console.warn(
                "No se encontró la carta recompensa:",
                rewardId
            );

            continue;

        }


        // Añadir recompensa.

        user.ownedCards.push(
            rewardId
        );


        user.cardsObtained =
            (user.cardsObtained ?? 0) + 1;


        newRewards.push(
            rewardCard
        );

    }


    // No hubo recompensas nuevas.

    if (
        newRewards.length === 0
    ) {

        return [];

    }


    user.ownedCards.sort();


    await updateUser(

        user.uid,

        {

            ownedCards:
                [...user.ownedCards],

            cardsObtained:
                user.cardsObtained

        }

    );


    return newRewards;

}


export async function addCardToUser(
    user,
    cardId
) {

    // =========================
    // Comprobar que la carta existe
    // =========================
    
    const card =
    await getCard(cardId);

if (!card) {

    return {

        user,

        card: null,

        completionRewards: [],

        reason: "CARD_NOT_FOUND"

    };

}

    // =========================
    // Evitar duplicados
    // =========================

    if (
        user.ownedCards.includes(
            cardId
        )
    ) {

        return {

            user,

            card: null,

            completionRewards: []

        };

    }


    // =========================
    // Añadir carta
    // =========================

    const updatedCards = [

        ...user.ownedCards,

        cardId

    ].sort();


    const cardsObtained =
        (user.cardsObtained ?? 0) + 1;


    user.ownedCards =
        [...updatedCards];

    user.cardsObtained =
        cardsObtained;


    await updateUser(

        user.uid,

        {

            ownedCards:
                updatedCards,

            cardsObtained

        }

    );


    // =========================
    // Comprobar recompensas
    // =========================

    const completionRewards =
        await checkCollectionCompletionRewards(
            user
        );


    return {

        user,

        card:
            await getCard(cardId),

        completionRewards

    };

}
