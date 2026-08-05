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

    // Si ya tiene colecciones, usamos esas
    if (event.collections) {
        return event;
    }

    // Si no, usamos la colección general
    const collectionsDoc = await getDocument(
        "events/Colecciones",
        "lista_colecciones"
    );

    return {
        ...event,
        enabled: true,
        collections: collectionsDoc.lista_colecciones
            ? collectionsDoc.lista_colecciones.map(collection =>
                Object.keys(collection)[0]
            )
            : []
    };
}