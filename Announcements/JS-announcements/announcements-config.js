
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
            status: "sent"
        })
    }

    let returned = await fetch("https://gunnpeeps.herokuapp.com/users", options);
    let data = await returned.json();
    console.log(data);
    if (data.signedIn) {
        globals.signedIn = true;
        globals.id_token = id_token;
        globals.name = profile.getName();
        globals.email = profile.getEmail();
        globals.pfp = profile.getImageUrl();
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
let getAnnounce;
$(() => {

    getAnnounce = async function () {
        if (globals.signedIn) {
            let returned = await fetch("https://gunnpeeps.herokuapp.com/announcements");
            let announcements = await returned.json();
            announcements.sort((a, b) => {
                return b.timestamp - a.timestamp
            })
            console.log(announcements);
            
            let wrapper = $("#announcements-content-div");
            wrapper.empty();

            for(let a of announcements){
                let currMsg = $("<div>").addClass("message");
                let t = new Date(a.timestamp);
                currMsg.html(
                `<div class="user-icon-wrapper">
                    <img class="pfp" src="${a.imgurl}" alt="">
                </div>
                <div class="smoltri"></div>
                <div class="message-content-wrapper">
                    <div class="message-user">
                        <span class="message-username">${a.name}</span> 
                        <span class="message-userat">BubbyBabur</span> 
                        <span class="message-forum">Announcements</span>
                        <span class="message-time">${t.toDateString()}</span>
                    </div>
                    <div class="message-content">
                        ${a.post}
                    </div>
                </div>`);
                wrapper.append(currMsg);
            }


            return true;
        }
        return false;
    }
    let curr = setInterval(async () => {
        if(await getAnnounce()){
            clearInterval(curr);
        }
    }, 200);

    $("#refresh").click(getAnnounce);
    
});

$(function () {
    /* let g1 = new Gradient("gradient-wrapper-heading");
    let g2 = new Gradient("gradient-wrapper-header");
    let gs = new GradientGroup([g1, g2]);
    gs.update();
    let timer = new Timed(2000, [gs]);
    timer.run(); */

    


});
