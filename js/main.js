import { createUI } from "./ui.js";
import { login, observeUser } from "./auth.js";

window.addEventListener("DOMContentLoaded",()=>{

    createUI();

    document
        .getElementById("loginButton")
        .addEventListener("click",login);

    observeUser(user=>{

        if(user){

            document.getElementById("userArea").innerHTML=`

<img src="${user.photoURL}" width="40">

<span>${user.displayName}</span>

`;

        }

    });

});