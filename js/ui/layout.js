export function renderUser(user) {

    return `
        <div id="profile">

            <div class="profile-header">

                <img
                    class="profile-avatar"
                    src="${user.photoURL}"
                    alt="${user.displayName}"
                >

                <div class="profile-data">

                    <h2>${user.displayName}</h2>

                    <div class="profile-currency">

                        <div class="currency">
                            💎
                            <strong>${user.gems}</strong>
                        </div>

                        <div class="currency">
                            🎫
                            <strong>${user.tickets}</strong>
                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div id="profileProgress"></div>

        <hr>

        <div id="bannerArea"></div>

        <div id="resultArea"></div>

        <hr>

        <div id="collectionArea"></div>

        <div id="modalArea"></div>
    `;

}