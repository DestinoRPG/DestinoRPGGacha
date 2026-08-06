export function createUI() {

    document.getElementById("app").innerHTML = `

<header id="topBar">

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

            🏠 Inicio

        </button>

        <button
            id="collectionButton"
            class="nav-button"
        >

            📚 Colección

        </button>

    </nav>
 
</header>


<div id="userArea">

</div>


        <main id="viewArea">

        </main>


        <div id="modalArea">

        </div>

    `;

}