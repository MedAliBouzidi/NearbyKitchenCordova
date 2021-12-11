import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signOut,
    getAuth
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js'

(function () {
    "use strict"

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady() {

        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);
        checkConnection();

        addListeners();

    }

    function checkConnection() {
        var connectiontype = navigator.connection.type;

        var status = {};
        status[Connection.UNKNOWN] = 'Unknown connection';
        status[Connection.ETHERNET] = 'Ethernet connection';
        status[Connection.WIFI] = 'WiFi connection';
        status[Connection.CELL_2G] = 'Cell 2G connection';
        status[Connection.CELL_3G] = 'Cell 3G connection';
        status[Connection.CELL_4G] = 'Cell 4G connection';
        status[Connection.CELL] = 'Cell generic connection';
        status[Connection.NONE] = 'No network connection';

        alert('Connection type: ' + status[connectiontype]);
    }

    function onOnline() {
        $("#infos").html("Connexion établie de type : " + connectiontype);
    }

    function onOffline() {
        $("#infos").html("Vérifier votre connexion !");
    }

    /* Auth */

    const gmailProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const auth = getAuth()

    function gmailSignUp() {
        signInWithRedirect(auth, gmailProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                localStorage.setItem("user", JSON.stringify(user))
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
    }

    function fbSignUp() {
        signInWithRedirect(auth, facebookProvider)
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;
                localStorage.setItem("user", JSON.stringify(user))
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
        })
    }

    function emailPasswordSignUp() {
        const email = document.getElementById("sign-up-email-input")
        const password = document.getElementById("sign-up-password-input")

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            })
    }

    function logOut() {
        signOut(auth).then(() => {
            alert("you are logged out!")
        }).catch((error) => {
            // An error happened.
        })
    }

    function addListeners() {

        // log in page
        $("#log-in-form").on('submit', () => { alert("login") })
        $("#log-in-fb-icon").on('click' , () => { alert('facebook') })
        $("#log-in-gmail-icon").on('click', () => { alert('gmail') } )
        // Sign up Page
        $("#sign-up-gmail-icon").on('click', () => { gmailSignUp() } )
        $("#sign-up-fb-icon").on('click' , () => { fbSignUp() })
        $("#sign-up-form").on('submit', () => { emailPasswordSignUp() })
        // Restaurant Page
        $('#star').on('click', () => { alert(`${$('#star').attr('src')}`) })
        // Log out button
        $("#log-out-btn").on('click' , () => { logOut() })
    }

})()
