import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { db } from "./app.js";


/**
 * Obtiene un documento.
 */
export async function getDocument(collectionName, id) {

    const ref = doc(db, collectionName, id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data();
}


/**
 * Obtiene un documento mediante una ruta completa.
 * Ejemplo:
 * events/hall_of_fame/collections/Colecciones
 */
export async function getDocumentByPath(path) {

    const ref = doc(db, ...path.split("/"));
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data();
}


/**
 * Crea o reemplaza un documento.
 */
export async function setDocument(collectionName, id, data) {

    const ref = doc(db, collectionName, id);

    await setDoc(ref, data);
}


/**
 * Actualiza un documento existente.
 */
export async function updateDocument(collectionName, id, data) {

    const ref = doc(db, collectionName, id);

    await updateDoc(ref, data);
}


/**
 * Obtiene todos los documentos de una colección.
 */
export async function getCollection(collectionName) {

    const ref = collection(db, collectionName);

    const snapshot = await getDocs(ref);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}