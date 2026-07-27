import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import { auth, provider } from "./app.js";

export function login() {
    return signInWithPopup(auth, provider);
}

export function logout() {
    return signOut(auth);
}

export function observeUser(callback) {
    onAuthStateChanged(auth, callback);
}