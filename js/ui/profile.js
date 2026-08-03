export function renderProfile(user, progressHtml = "") {

    return `

        <div id="profile">

            <img
                class="profile-avatar"
                src="${user.photoURL}"
                alt="${user.displayName}"
            >

            <h2 class="profile-name">

                ${user.displayName}

            </h2>

            <div class="profile-currency">

                <div class="currency">

                    💎 ${user.gems}

                </div>

                <div class="currency">

                    🎫 ${user.tickets}

                </div>

            </div>

            <div id="profileProgress">

                ${progressHtml}

            </div>

        </div>

    `;

}

export function renderCollectionProgress(name, owned, total){

    const percent =
        total === 0
            ? 0
            : Math.round(owned / total * 100);

    return `

        <div class="collection-progress">

            <div class="progress-header">

                <span>${name}</span>

                <span>${owned} / ${total}</span>

            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percent}%"
                ></div>

            </div>

            <div class="progress-percentage">

                ${percent}% completado

            </div>

        </div>

    `;

}