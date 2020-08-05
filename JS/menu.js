
globals.menuShown = false;
$(() => {
    $("#menu-icon").click(() => {
        if (globals.menuShown){
            $(".nav-option").fadeOut(200);
            $("#menu-icon").css("transform", "translate(-50%, -50%) rotate(0deg)");
            $("#header-logo-div").fadeIn(200);
        } else {
            $(".nav-option").fadeIn(200);
            $("#menu-icon").css("transform", "translate(-50%, -50%) rotate(360deg)")
            $("#header-logo-div").fadeOut(200);
        }
        globals.menuShown = !globals.menuShown;
    })

    /* $("#header-logo").hover(() => {
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
    }) */
})