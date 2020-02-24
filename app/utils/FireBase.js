import firebase from "firebase/app"


const firebaseConfig = {
        apiKey: "AIzaSyCACuf-rV7WTCiLFjIPx3DFS_9Um8Gj_hs",
        authDomain: "ruta-gastronomica-murcia-2020.firebaseapp.com",
        databaseURL: "https://ruta-gastronomica-murcia-2020.firebaseio.com",
        projectId: "ruta-gastronomica-murcia-2020",
        storageBucket: "ruta-gastronomica-murcia-2020.appspot.com",
        messagingSenderId: "431658155950",
        appId: "1:431658155950:web:e0bf9caedc46f4e726123f",
        measurementId: "G-1JWD5VP6KN"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyCACuf-rV7WTCiLFjIPx3DFS_9Um8Gj_hs",
//     authDomain: "ruta-gastronomica-murcia-2020.firebaseapp.com",
//     databaseURL: "https://ruta-gastronomica-murcia-2020.firebaseio.com",
//     projectId: "ruta-gastronomica-murcia-2020",
//     storageBucket: "ruta-gastronomica-murcia-2020.appspot.com",
//     messagingSenderId: "431658155950",
//     appId: "1:431658155950:web:e0bf9caedc46f4e726123f",
//     measurementId: "G-1JWD5VP6KN"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>