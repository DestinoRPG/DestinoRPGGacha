import {
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { db } from "./app.js";

/**
 * Obtiene un documento.
 */
export async function getDocument(collection, id) {
    const ref = doc(db, collection, id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data();
}

/**
 * Crea o reemplaza un documento.
 */
export async function setDocument(collection, id, data) {
    const ref = doc(db, collection, id);
    await setDoc(ref, data);
}

/**
 * Actualiza un documento existente.
 */
export async function updateDocument(collection, id, data) {
    const ref = doc(db, collection, id);
    await updateDoc(ref, data);
}