
globals.menuShown = false;
$(() => {
    $("#menu-icon").click(() => {
        if (globals.menuShown){
            $(".nav-bar a div").fadeOut(200);
            $("#menu-icon").css("transform", "translate(-50%, -50%) rotate(0deg)");
            $("#header-logo-div").fadeIn(200);
            $("#sign-in-google").fadeIn(200);
        } else {
            $(".nav-bar a div").fadeIn(200);
            $("#menu-icon").css("transform", "translate(-50%, -50%) rotate(360deg)")
            $("#header-logo-div").fadeOut(200);
            $("#sign-in-google").fadeOut(200);
        }
        globals.menuShown = !globals.menuShown;
    })

    $("#header-logo").hover(() => {
        console.log(globals.menuShown);
        if(!globals.menuShown){
            $("#header-logo").css({
                width: "80px"
            })
        }
    }, () => {
        console.log(globals.menuShown);
        if (!globals.menuShown){
            $("#header-logo").css({
                width: "70px"
            })
        }
    })
})