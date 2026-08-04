export function createUI() {

    document.getElementById("app").innerHTML = `

        <header>

            <img
                id="mainLogo"
                src="images/logo-gacha.webp"
                alt="Destino RPG Gacha"
            >

        </header>


        <nav id="navigation">

            <button
                id="homeButton"
                class="nav-button active"
            >

                🏠 Inicio

            </button>


            <button
                id="collectionButton"
                class="nav-button"
            >

                📚 Colección

            </button>

        </nav>


        <div id="userArea">

            <button id="loginButton">

                Iniciar sesión

            </button>

        </div>


        <main id="viewArea">

        </main>


        <div id="modalArea">

        </div>

    `;

}