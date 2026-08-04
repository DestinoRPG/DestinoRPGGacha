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
            month:"long",
            year:"numeric"
        }
    );


}




export function renderProfile(
    user,
    progressHtml = ""
) {


    return `


        <div id="profile">



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



                <div id="profileProgress">

                    ${progressHtml}

                </div>


            </div>





            <div class="profile-currency">


                <div class="currency">

                    🎫
                    ${user.tickets ?? 0}

                    ticket${
                        user.tickets === 1
                            ? ""
                            : "s"
                    }


                </div>


            </div>



        </div>


    `;


}





export function renderCollectionProgress(
    name,
    owned,
    total
){

    const percent =
        total === 0

            ? 0

            :

            Math.round(
                owned /
                total *
                100
            );



    return `


        <div class="collection-progress">


            <div class="progress-header">


                <span>

                    ${name}

                </span>



                <span>

                    ${owned}
                    /
                    ${total}

                </span>



            </div>




            <div class="progress-bar">


                <div

                    class="progress-fill"

                    style="
                        width:${percent}%
                    "

                ></div>


            </div>




            <div class="progress-percentage">

                ${percent}%
                completado

            </div>



        </div>


    `;


}