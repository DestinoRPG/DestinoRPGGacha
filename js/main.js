import { initializeFirebase } from "./firebase.js";
import { createUI } from "./ui.js";

window.addEventListener("DOMContentLoaded", () => {

    initializeFirebase();

    createUI();

});