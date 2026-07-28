import { getCollection } from "../firebase/firestore.js";

/**
 * Devuelve todos los eventos habilitados.
 */
export async function getEnabledEvents() {

    const events = await getCollection("events");

    return events.filter(event => event.enabled);
}

/**
 * Devuelve un evento por su ID.
 */
export async function getEvent(id) {

    const events = await getCollection("events");

    return events.find(event => event.id === id) || null;
}