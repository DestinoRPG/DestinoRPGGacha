export function renderBanner() {

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

                    <div class="banner-collection">

                        ⭐ Salón de la Fama

                    </div>

                    <div class="banner-collection">

                        👥 Administradores

                    </div>

                    <div class="banner-collection">

                        ✍️ Colaboradores

                    </div>

                </div>

                <button id="summonButton">

                    Invocar

                </button>

            </div>

        </div>
    `;

}