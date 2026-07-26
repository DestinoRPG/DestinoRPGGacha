import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

let app = null;

export function initializeFirebase() {

    const firebaseConfig = {
        apiKey: "AIzaSyDjw2E3c4XMeNPJhCUeU6JIhs3KLHClvwc",
        authDomain: "destino-rpg-gacha.firebaseapp.com",
        projectId: "destino-rpg-gacha",
        storageBucket: "destino-rpg-gacha.firebasestorage.app",
        messagingSenderId: "335640128673",
        appId: "1:335640128673:web:ae8609620fe49e9a8c54e0"
    };

    app = initializeApp(firebaseConfig);

    return app;
}

export { app };