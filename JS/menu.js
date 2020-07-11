
globals.menuShown = false;
$(() => {
    $("#menu-icon").click(() => {
        if (globals.menuShown){
            $(".nav-bar a div").fadeOut(200);
            $("#menu-icon").css("transform", "translate(-50%, -50%) rotate(0deg)");
            $("#header-logo").css("width","120px");
        } else {
            $(".nav-bar a div").fadeIn(200);
            $("#menu-icon").css("transform", "translate(-50%, -50%) rotate(360deg)")
            $("#header-logo").css("width", "0px");
        }
        globals.menuShown = !globals.menuShown;
    })

    $("#header-logo").hover(() => {
        console.log(globals.menuShown);
        if(!globals.menuShown){
            $("#header-logo").css({
                width: "150px"
            })
        }
    }, () => {
        console.log(globals.menuShown);
        if (!globals.menuShown){
            $("#header-logo").css({
                width: "120px"
            })
        }
    })
})