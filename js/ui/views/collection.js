import { renderCollection } from "../collection.js";

export function renderCollectionView(
    cards,
    profile
) {

    return `

        <section class="collection-view">

            ${renderCollection(
                cards,
                profile
            )}

        </section>

    `;

}