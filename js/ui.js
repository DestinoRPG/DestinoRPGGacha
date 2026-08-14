export function createUI() {

    document.getElementById("app").innerHTML = `

        <!-- =========================
             CABECERA
        ========================== -->

        <header id="topBar">

            <div class="site-title">

                <div class="site-title-main">
                    DESTINO RPG
                </div>

                <div class="site-title-sub">
                    G A C H A
                </div>

            </div>

        </header>


        <!-- =========================
             NAVEGACIÓN
        ========================== -->

        <nav id="navigation">

            <button
                id="homeButton"
                class="nav-button"
            >

                <i class="fa-solid fa-house"></i>

                <span>
                    Inicio
                </span>

            </button>


            <button
                id="collectionButton"
                class="nav-button"
            >

                <i class="fa-solid fa-book-open"></i>

                <span>
                    Colección
                </span>

            </button>

        </nav>


        <div id="userArea">

        </div>


        <main id="viewArea">

        </main>


        <div id="modalArea">

        </div>

    `;

}