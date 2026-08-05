export async function getEnabledEvents() {

    const events = await getCollection("events");

    console.log("EVENTOS LEIDOS:", events);

    return events.filter(event => event.enabled);
}


export async function getEvent(id) {

    const events = await getCollection("events");

    console.log("BUSCANDO EVENTO:", id);
    console.log("EVENTOS DISPONIBLES:", events);

    return events.find(event => event.id === id) || null;
}