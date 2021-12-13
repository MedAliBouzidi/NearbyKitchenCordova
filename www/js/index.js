import {
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js'

(function () {
    "use strict"

    document.addEventListener('deviceready', onDeviceReady.bind(this), false)


    function onDeviceReady() {

        document.addEventListener('online', onOnline, false)
        document.addEventListener('offline', onOffline, false)
        //checkConnection()

        addListeners()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                $('#log-in-item').hide()
                $('#sig-up-item').hide()
                $('#favorite-item').show()
                $('#logout').show()
            } else {
                $('#log-in-item').show()
                $('#sig-up-item').show()
                $('#favorite-item').hide()
                $('#logout').hide()
            }
        })
    }

    function checkConnection() {
        var connectiontype = navigator.connection.type

        var status = {}
        status[Connection.UNKNOWN] = 'Unknown connection'
        status[Connection.ETHERNET] = 'Ethernet connection'
        status[Connection.WIFI] = 'WiFi connection'
        status[Connection.CELL_2G] = 'Cell 2G connection'
        status[Connection.CELL_3G] = 'Cell 3G connection'
        status[Connection.CELL_4G] = 'Cell 4G connection'
        status[Connection.CELL] = 'Cell generic connection'
        status[Connection.NONE] = 'No network connection'

        alert('Connection type: ' + status[connectiontype])
    }

    function onOnline() {
        $("#infos").html("Connexion établie de type : " + connectiontype)
    }

    function onOffline() {
        $("#infos").html("Vérifier votre connexion !")
    }

    /* Auth */

    const gmailProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const auth = getAuth()

    function gmailAuth() {
        signInWithRedirect(auth, gmailProvider)
            .then(() => {
                return getRedirectResult(auth)
            })
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result)
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                const token = credential.accessToken

                // The signed-in user info.
                const user = result.user
                localStorage.setItem("user", JSON.stringify(user))
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            // ...
        })
    }

    function fbAuth() {
        signInWithRedirect(auth, facebookProvider)
            .then(() => {
                return getRedirectResult(auth)
            })
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result)
                const token = credential.accessToken

                const user = result.user
                localStorage.setItem("user", JSON.stringify(user))
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error)
            // ...
        })
    }

    function emailPasswordSignUp(event) {
        event.preventDefault()

        let name = $('#sign-up-name-input').val()
        let email = $('#sign-up-email-input').val()
        let password = $('#sign-up-password-input').val()
        let confirmPassword = $('#sign-up-confirm-password-input').val()

        if (name !== '' && email !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        return updateProfile(auth.currentUser, { displayName: name })
                    })
                    .then(() => {
                        sendEmailVerification(auth.currentUser)
                        $('.logout').show()
                        window.location.href = '#home'
                    })
                    .catch((err) => {
                        alert(`${err.message}`)
                    })
            } else {
                alert('Please confirm your password correctly!')
            }
        } else {
            alert('There\'s an empty input!')
        }
    }

    function emailPasswordLogin(event) {
        let email = $('#log-in-email-input').val()
        let password = $('#log-in-password-input').val()

        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user
                    $('.logout').show()
                    window.location.href = '#home'
                })
                .catch((err) => {
                    alert(`${err.message}`)
                })
        } else {
            alert('There\'s an empty input!')
        }
    }

    function logOut() {
        if (confirm("do you really want to log out?")){
            signOut(auth)
        }
    }

    function addListeners() {

        // log in page
        $("#log-in-form").on('submit',
            (event) => { emailPasswordLogin(event) })
        $("#log-in-fb-icon").on('click', () => { alert('facebook') }).hide()
        $("#log-in-gmail-icon").on('click', () => { alert('gmail') }).hide()

        // Sign up Page
        $("#sign-up-form").on( 'submit',
            (event) => { emailPasswordSignUp(event) })
        $("#sign-up-fb-icon").on('click', () => { fbAuth() }).hide()
        $("#sign-up-gmail-icon").on('click', () => { gmailAuth() }).hide()

        // Restaurant Page
        $('#star').on('click', () => { alert(`${$('#star').attr('src')}`) })

        // Log out button
        $("#log-out-btn").on('click', () => { logOut() })

        // Hide Log out Footer
        $('#logout').hide()
    }

})()
