
// Render button override
function renderButton() {
    gapi.signin2.render('sign-in-google', {
        'scope': 'profile email',
        'width': 400,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': customOnSignIn,
        'onfailure': onFailure
    });
}

async function customOnSignIn(GoogleUser) {
    await onSuccess(GoogleUser);
    window.location = "/GoogleSignUp";
}
