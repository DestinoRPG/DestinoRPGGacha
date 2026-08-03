export function renderBanner(availableCards) {

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

                    Contiene cartas de todas las colecciones disponibles.

                </p>

                <div class="banner-info">

                    <div>

                        <strong>${availableCards.length}</strong>

                        cartas por descubrir

                    </div>

                </div>

                <button id="summonButton">

                    Invocar

                </button>

            </div>

        </div>
    `;

}