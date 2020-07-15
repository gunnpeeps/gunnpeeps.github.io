
let globals = {
    signedIn: false,
    id_token: false,
    buttonrendered: false,
    posting: false
}

function renderButton() {
    if(!globals.buttonrendered){
        globals.buttonrendered = true;
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

    let returned = await fetch("https://gunnpeepsback.glitch.me/users", options);
    let data = await returned.json();
    console.log(data);
    if (data.signedIn) {
        globals.signedIn = true;
        globals.id_token = id_token;
        globals.name = profile.getName();
        globals.fn = profile.getGivenName();
        globals.ln = profile.getFamilyName();
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
$(() => {

    let getAnnounce = async function () {
        if (globals.signedIn) {
            let returned = await fetch("https://gunnpeepsback.glitch.me/announcements");
            let announcements = await returned.json();
            announcements.sort((a, b) => {
                return a.timestamp - b.timestamp
            })
            
            let wrapper = $("#announcements-content-div");
            /*wrapper.empty();*/

            for(let a of announcements){

                if($(`.message[data-msgid="${a._id}"]`).length > 0){
                    continue;
                }
                let currMsg = $("<div>").addClass("message").attr("data-msgid",a._id);
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
                wrapper.prepend(currMsg);
            }


            return true;
        }
        return false;
    }

    let setupside = function(){
        
        let sides = ["format","me","friends","forums"]

        for (let s of sides) {
            $(`#side-${s}-div`).fadeOut(0);
        }
        $("#side-format-div").fadeIn(0);

        for(let s1 of sides){
            $(`#side-${s1}`).click(() => {
                for (let s of sides) {
                    $(`#side-${s}-div`).fadeOut(0);
                }
                $(`#side-${s1}-div`).fadeIn(0);
                
            });
        }

        /* 
        $("#side-format").click(() => {
            $("#side-div div:nth-child(2)").remove();
            $("#side-div div:nth-child(1)").after(formatdiv);
        })
        $("#side-me").click(() => {
            $("#side-div div:nth-child(2)").remove();
            $("#side-div div:nth-child(1)").after(mediv);
            setupuserinfo();
        })
        $("#side-friends").click(() => {
            $("#side-div div:nth-child(2)").remove();
            $("#side-div div:nth-child(1)").after(frienddiv);
        })
        $("#side-forums").click(() => {
            $("#side-div div:nth-child(2)").remove();
            $("#side-div div:nth-child(1)").after(forumsdiv);
        })
         */

    }

    let setupuserinfo = function(){
        $(".userpfp").attr("src", globals.pfp);
        $(".username").text(globals.name);
    }
    
    let onLoad = async function() {

        setupuserinfo();
        setupside();
        $("#announcements-content-div").empty();
        
        $(".current-date").html(new Date(Date.now()).toDateString());

        $("#post-button").click(() => {
            if(globals.posting){
                $("#announcements-post-div").fadeOut(200);
            } else {
                $("#announcements-post-div").fadeIn(200);
            }
            globals.posting = !globals.posting;
            
        });

        $(".post-post-button").click(async () => {
            if (globals.signedIn) {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: globals.id_token,
                        post: $(".post-content").html(),
                        status: "sent"
                    })
                }

                let returned = await fetch("https://gunnpeepsback.glitch.me/announcements", options);
                returned = await returned.json();
                console.log(returned);
                if(returned.success){
                    $(".post-content").empty();
                    await getAnnounce();
                }
            }
        })

        await getAnnounce();

        setInterval(async () => {
            await getAnnounce();
        }, 500);
    }

    let curr = setInterval(async () => {
        if(globals.signedIn){
            clearInterval(curr);
            await onLoad();
        }
    }, 1500);

    $("#refresh").click(getAnnounce);
    
});
