import { getCollection, getDocumentByPath } from "../firebase/firestore.js";


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
console.log("ID EVENTO:", id);

    // Si ya tiene colecciones configuradas, no hace falta buscarlas.
    if (event.collections) {
        return event;
    }


    // Busca las colecciones asociadas al evento.
const path = `events/${id}/collections/Colecciones`;

console.log("BUSCANDO:", path);

const collectionsDoc = await getDocumentByPath(path);

console.log("RESULTADO COLECCIONES:", collectionsDoc);


    if (!collectionsDoc || !collectionsDoc.lista_colecciones) {

        return {
            ...event,
            enabled: true,
            collections: []
        };
    }


    const collections = collectionsDoc.lista_colecciones.map(collection =>
        Object.keys(collection)[0]
    );


    return {
        ...event,
        enabled: true,
        collections
    };
}