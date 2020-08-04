
let globals = {
    signedIn: false,
    id_token: false
}


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBeF-utzLhcXMG1J0qqrWzk_qYtJx8HM9U",
    authDomain: "gunn-peeps.firebaseapp.com",
    databaseURL: "https://gunn-peeps.firebaseio.com",
    projectId: "gunn-peeps",
    storageBucket: "gunn-peeps.appspot.com",
    messagingSenderId: "141473042666",
    appId: "1:141473042666:web:8e05628300e5538ead8793"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
// let rtdb = firebase.database();
let auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(async function (user) {
    window.user = user; // user is undefined if no user signed in

    if(!user){
        return;
    }

    console.log(user);
    console.log(user.displayName);

    globals.signedIn = true;
    globals.name = user.displayName;
    globals.email = user.email;
    globals.pfp = user.photoURL;
    globals.uid = user.uid;

    let userref = db.doc(`Users/${user.uid}/Public/UserInfo`);
    let userdata = await userref.get();
    if(userdata.exists){
        console.log(userdata.data());
        globals.atname = userdata.data().AtName;
        if (window.location.href.indexOf("GoogleSignUp") !== -1) {
            window.location.href = "/"
        }
    } else if(window.location.href.indexOf("GoogleSignUp") === -1) {
        window.location.href = "/GoogleSignUp"
    }
    //`${user.uid}`

});

// let user = firebase.auth().currentUser

$( async () => {


    $("#signin").click(async (event) => {

        event.preventDefault();
        
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            console.log(user.displayName);

            
            // globals.atname = data.user.atname;
            // globals.ssid = data.user.ssid;
            // globals.announcementsallowed = data.user.announcementsallowed;
            // globals.createForumsAllowed = data.user.createForumsAllowed;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    })

})