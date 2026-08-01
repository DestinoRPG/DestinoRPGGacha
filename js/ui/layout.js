export function renderUser(user) {

    return `
        <div id="profile">

            <img
                src="${user.photoURL}"
                width="48"
                height="48"
                style="border-radius:50%;vertical-align:middle;"
            >

            <strong style="margin-left:10px;">
                ${user.displayName}
            </strong>

            <div style="margin-top:8px;">
                💎 ${user.gems}
                &nbsp;&nbsp;
                🎫 ${user.tickets}
            </div>

        </div>

        <hr>

        <div id="bannerArea"></div>

        <div id="resultArea"></div>

        <hr>

        <div id="collectionArea"></div>
    `;
}

export function renderProgress(user, availableCards, totalCards) {

    const ownedInBanner = totalCards - availableCards;

    return `
        <div class="banner-progress">

            Colección:
            <strong>${ownedInBanner} / ${totalCards}</strong>

        </div>
    `;

}