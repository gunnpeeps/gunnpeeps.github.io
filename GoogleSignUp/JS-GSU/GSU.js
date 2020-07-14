// Render button override
function renderButton() {
    gapi.signin2.render('sign-in-google', {
        'scope': 'profile email',
        'width': 400,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function signOutCurr(){
    signOut();
    window.location = "/UserSignUp";
}

$(() => {

    let setupuserinfo = function () {
        $("#fn").attr("value",globals.fn);
        $("#ln").attr("value", globals.ln);
        $("#email-address").attr("value", globals.email);
    }

    let onLoad = async function () {

        setupuserinfo();

    }

    let curr = setInterval(async () => {
        if (globals.signedIn) {
            clearInterval(curr);
            await onLoad();
        }
    }, 200);

});
