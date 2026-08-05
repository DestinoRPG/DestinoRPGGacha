import { getCollection, getDocument } from "../firebase/firestore.js";

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

    const event = events.find(event => event.id === id);

    if (!event) {
        return null;
    }

    // Si el evento ya tiene colecciones definidas, las usamos
    if (event.collections) {
        return event;
    }

    // Cargar la lista general de colecciones
    const collectionsDoc = await getDocument(
        "events",
        "Colecciones"
    );

    const collections = collectionsDoc.lista_colecciones.map(collection =>
        Object.keys(collection)[0]
    );

    return {
        ...event,
        enabled: true,
        collections
    };
}