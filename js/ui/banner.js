import { COLLECTIONS } from "../data/collections.js";

export function renderBanner(user) {

    const collections = COLLECTIONS
        .filter(collection => collection.enabled)
        .map(collection => `

            <div class="banner-collection">

                ${collection.icon}
                <span>${collection.name}</span>

            </div>

        `)
        .join("");

    return `

        <div class="banner">

            <div class="banner-image">

                <img
                    src="images/banners/standard.webp"
                    alt="Invocación estándar"
                >

            </div>

            <div class="banner-content">

                <h2>

                    Invocación estándar

                </h2>

                <p>

                    Contiene cartas de todas las colecciones permanentes.

                </p>

                <div class="banner-collections">

                    ${collections}

                </div>

                <button
                    id="summonButton"
                    ${user.tickets <= 0 ? "disabled" : ""}

                >

                    🎫 Invocar (${user.tickets})

                </button>

            </div>

        </div>

    `;

}