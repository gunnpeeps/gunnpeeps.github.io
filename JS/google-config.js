let globals = {
    signedIn: false,
    id_token: false,
}

function renderButton() {
    gapi.signin2.render('sign-in-google', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

async function onSuccess(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify({
            token: id_token,
            signingwithgoogle: true,
            status: "sent"
        })
    }

    let returned = await fetch("https://gunnpeepsback.glitch.me/user-sign-in", options);
    console.log(returned.json);
    let data = await returned.json();
    console.log(data);
    if (data.signedIn) {
        globals.signedIn = true;
        globals.id_token = id_token;
        globals.name = data.user.name;
        globals.email = profile.getEmail();
        globals.pfp = profile.getImageUrl();
        globals.atname = data.user.atname;
        globals.ssid = data.user.ssid;
        globals.announcementsallowed = data.user.announcementsallowed;
        globals.createForumsAllowed = data.user.createForumsAllowed;
    } else {
        window.location.href = "/GoogleSignUp/"
    }
}

function onFailure(error) {
    console.log(error);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
