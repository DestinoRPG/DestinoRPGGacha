export function getUrlParams() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return {

        reward:
            params.get("reward"),

        card:
            params.get("card")

    };

}


/**
 * Indica si la página se abrió
 * para reclamar una recompensa.
 */
export function hasPendingReward() {

    const {
        reward,
        card
    } = getUrlParams();


    return (

        (
            reward === "article" &&
            card !== null
        )

        ||

        (
            reward === "anniversary14" &&
            card !== null
        )

    );

}


/**
 * Elimina los parámetros de la URL
 * después de procesarlos.
 */
export function clearUrlParams() {

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );

}