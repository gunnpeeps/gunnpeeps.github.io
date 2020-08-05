globals = {
    signedIn: false,
    id_token: false
}

// Render button override
// function renderButton() {
//     gapi.signin2.render('sign-in-google', {
//         'scope': 'profile email',
//         'width': 400,
//         'height': 50,
//         'longtitle': true,
//         'theme': 'dark',
//         'onsuccess': onSuccess,
//         'onfailure': onFailure
//     });
// }

// async function onSuccess(googleUser) {

//     var profile = googleUser.getBasicProfile();
//     console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//     console.log('Full Name: ' + profile.getName());
//     console.log('Given Name: ' + profile.getGivenName());
//     console.log('Family Name: ' + profile.getFamilyName());
//     console.log("Image URL: " + profile.getImageUrl());
//     console.log("Email: " + profile.getEmail());

//     // The ID token you need to pass to your backend:
//     var id_token = googleUser.getAuthResponse().id_token;
//     console.log("ID Token: " + id_token);

//     globals.signedInClient = true;
//     globals.id_token = id_token;
//     globals.name = profile.getName();
//     globals.fn = profile.getGivenName();
//     globals.ln = profile.getFamilyName();
//     globals.email = profile.getEmail();
//     globals.pfp = profile.getImageUrl();
// }

// function onFailure(error) {
//     console.log(error);
// }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log('User signed out.');
//     });
// }

function signOutCurr(){
    // signOut();
    // window.location = "/UserSignUp";
}

$(() => {

    let setupuserinfo = function () {
        $("#fn").attr("value",globals.name.split(" ")[0]);
        $("#ln").attr("value", globals.name.split(" ")[1]);
        $("#email-address").attr("value", globals.email);
    }

    let clearmsgs = function(){
        $(".errormsg").remove();
        $(".incorrect").removeClass("incorrect");
    }

    let addError = function(id, error){
        $(`#${id}`).addClass("incorrect");
        let err = $("<span>").addClass("errormsg").html(error);
        err.insertAfter($(`#${id}`))
    }

    let setupform = function() {
        clearmsgs();
        $("#submit").click(submit);
    }

    let submit = async function(){
        clearmsgs();
        // if($("#password").val() !== $("#Gd-verify").val()){
        //     addError("password-verify","Passwords don't match.")
        //     return;
        // }
        for(let id of ["fn", "ln", "atname"]){
            if($(`#${id}`).val().length === 0){
                addError(id,"Field is empty.");
                return;
            }
        }

        // let userref = db.collection(`Users/${globals.uid}/Public`).doc(`UserInfo`);
        // let userdata = await userref.get();

        let userref = rt.ref(`Users/${globals.uid}/Public/UserInfo`);
        let userdata = await userref.once("value");

        if(userdata.exists()){
            addError("email-address", "You've already signed in with this account. Return to the main page and you'll automatically be signed in.");
        } else {
            // let userref = db.collection(`Users/${globals.uid}/Public`).doc(`UserInfo`);
            let userref = rt.ref(`Users/${globals.uid}/Public/UserInfo`);
            await userref.set({
                AtName: $("#atname").val(),
                FirstName: $("#fn").val(),
                LastName: $("#ln").val(),
                PFPURL: globals.pfp
            }, function(error){
                if(error){
                    addError("email-address",error);
                } else {
                    window.location.href = "/";
                }
            })

            
        }

    //     let options = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             token: globals.id_token,
    //             signingwithgoogle: true,
    //             status: "sent",
    //             atname: $("#atname").val(),
    //             password: $("#password").val(),
    //             fn: $("#fn").val(),
    //             ln: $("#ln").val(),
    //         })
    //     }

    //    let returned = await fetch("https://gunnpeepsback.glitch.me/user-create", options);
    //     returned = await returned.json();
    //     console.log(returned);
    //     if (returned.status === "ADDED") {
    //         window.location.href = "/";
    //     } else if(returned.error === "EMAIL TAKEN"){
    //         addError("email-address","You've already signed in with this account. Return to the main page and you'll automatically be signed in.");
    //     } else if (returned.error === "USERNAME TAKEN") {
    //         addError("atname", "@name taken.");
    //     }
    }

    let onLoad = async function () {

        setupuserinfo();
        setupform();

    }

    let curr = setInterval(async () => {
        if (globals.signedIn) {
            clearInterval(curr);
            await onLoad();
        }
    }, 200);

});
