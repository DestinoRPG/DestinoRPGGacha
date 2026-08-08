function formatJoinDate(timestamp) {

    if (!timestamp) {

        return "";

    }

    let date;

    if (
        typeof timestamp.toDate ===
        "function"
    ) {

        date =
            timestamp.toDate();

    }

    else {

        date =
            new Date(timestamp);

    }

    return date.toLocaleDateString(
        "es-ES",
        {
            month: "long",
            year: "numeric"
        }
    );

}

export function renderProfile(
    user,
    progressHtml = ""
) {

    return `

        <div id="profile">

            <div class="profile-main">

                <img

                    class="profile-avatar"

                    src="${
                        user.photoURL ||
                        "images/default-avatar.webp"
                    }"

                    alt="${
                        user.displayName ||
                        "Usuario"
                    }"

                >

                <div class="profile-info">

                    <h2 class="profile-name">

                        ${
                            user.displayName ||
                            "Coleccionista"
                        }

                    </h2>

                    <p class="profile-member">

                        Coleccionista desde
                        ${formatJoinDate(
                            user.createdAt
                        )}

                    </p>

                </div>

                <div class="profile-tickets">

                    <span class="ticket-icon">

                        🎫

                    </span>

                    <span class="ticket-value">

                        ${user.tickets ?? 0}

                    </span>

                </div>

            </div>

            <div id="profileProgress">

                ${progressHtml}

            </div>

        </div>

    `;

}


export function renderCollectionProgress(
    name,
    owned,
    total
) {

    const percent =

        total === 0

            ? 0

            : Math.round(
                owned /
                total *
                100
            );


    const completed =
        total > 0 &&
        owned >= total;


    return `

        <div
            class="
                collection-progress
                ${completed ? "completed" : ""}
            "
        >

            <div class="progress-header">

                <span class="progress-name">

                    ${name}

                </span>


                <span class="progress-count">

                    ${owned}
                    /
                    ${total}

                    ${
                        completed
                            ? `<span class="completion-mark">✦</span>`
                            : ""
                    }

                </span>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percent}%"
                ></div>

            </div>


            <div class="progress-footer">

                ${
                    completed
                        ? "✦ Colección completada"
                        : `${percent}% completado`
                }

            </div>

        </div>

    `;

}