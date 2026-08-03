export function renderUser(user) {

    return `
        <div id="profile">

            <div class="profile-user">

                <img
                    src="${user.photoURL}"
                    width="64"
                    height="64"
                    style="border-radius:50%;"
                >

                <div>

                    <h2>${user.displayName}</h2>

                    <div class="profile-currency">

                        💎 ${user.gems}

                        &nbsp;&nbsp;&nbsp;

                        🎫 ${user.tickets}

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