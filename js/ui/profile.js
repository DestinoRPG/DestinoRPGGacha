export function renderCollectionProgress(title, owned, total) {

    const percentage =
        total === 0
            ? 0
            : Math.round((owned / total) * 100);

    return `
        <div class="collection-progress">

            <div class="progress-header">

                <span>${title}</span>

                <span>${owned} / ${total}</span>

            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percentage}%"
                ></div>

            </div>

        </div>
    `;

}