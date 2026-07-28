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

            gems: 1000,
            tickets: 10,

            ownedCards: [],

            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
        };

        await setDocument("users", firebaseUser.uid, user);

    } else {

        await updateDocument("users", firebaseUser.uid, {
            lastLogin: serverTimestamp()
        });

        user = await getDocument("users", firebaseUser.uid);

    }

    return user;
}

export async function updateUser(uid, data) {
    await updateDocument("users", uid, data);
}