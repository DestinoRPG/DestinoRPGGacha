export function createUI() {

    document.getElementById("app").innerHTML = `

        <div id="topBar">

            <img
                id="mainLogo"
                src="images/logo-gacha.webp"
                alt="Destino RPG Gacha"
            >

            <nav id="navigation">

<button
    id="homeButton"
    class="nav-button"
>
    <i class="fa-solid fa-house"></i>
    <span>Inicio</span>
</button>

<button
    id="collectionButton"
    class="nav-button"
>
    <i class="fa-solid fa-book-open"></i>
    <span>Colección</span>
</button>

            </nav>

        </div>


        <div id="userArea">

        </div>


        <main id="viewArea">

        </main>


        <div id="modalArea">

        </div>

    `;
}