import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { db } from "../firebase/app.js";

export async function createOrLoadUser(user) {

    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);

    if (snap.exists()) {

        return snap.data();

    }

    const newUser = {

        uid: user.uid,

        displayName: user.displayName,

        email: user.email,

        photoURL: user.photoURL,

        gems: 1000,

        tickets: 10,

        ownedCards: [],

        createdAt: serverTimestamp(),

        lastLogin: serverTimestamp()

    };

    await setDoc(ref, newUser);

    return newUser;

}