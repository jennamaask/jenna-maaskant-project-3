
const myApp = {};

//wave SVG's
myApp.waveGraphics = {
    flat: {
        amplitude1: 10,
        amplitude2: 20,
        amplitude3: 15
    },
    gentle: {
        amplitude1: 40,
        amplitude2: 50,
        amplitude3: 60
    },
    big: {
        amplitude1: 150,
        amplitude2: 120,
        amplitude3: 130
    }
};


//background choices
myApp.background = {
    sunrise: "linear-gradient(to bottom, #ba5370, #f4e2d8)",
    day: "linear-gradient(to bottom, #b7eaff 0%,#94dfff 100%)",
    night: "linear-gradient(to top, #283048, #859398)"
};

myApp.soundDelay = {
    boats: 10000,
    birds: 3000
}



// event listener for submit
myApp.init = () => {
    $("form").on("submit", function(e){
        e.preventDefault();
        myApp.determineUserInput();
        $(".landing").hide();
            // $(".beach").show();
            myApp.displayExitIcon();
            myApp.exit();
    });
};

// get values from form and initilize display and audio functions
myApp.determineUserInput = () => {
    const waveSize = $(`input[name="wave-size"]:checked`).val();
    const time = $(`input[name="time-of-day"]:checked`).val();
    const weather = $(`input[name="weather"]:checked`).val();
    const sounds = ["birds", "boats", "beers"];
    const userSounds = sounds.filter((item) => {
        if ($(`input[name=${item}]`).prop("checked") == true) {
            return item;
        };
    });
    $("audio").show();
    myApp.displayWave(waveSize);
    myApp.displayTimeAndWeather(time, weather);
    myApp.playSoundClips(weather, userSounds);
};

// display waves according to user size choice
myApp.displayWave = (waveSize) => {
    // $(".beach").append(myApp.waveGraphics[waveSize]);
    // if (myApp.wave1 === undefined) {

    myApp.wave1 = $("#wave-1").wavify({
        height: 400,
        bones: 4,
        amplitude: myApp.waveGraphics[waveSize].amplitude1,
        speed: .15
    });

    myApp.wave2 = $("#wave-2").wavify({
        height: 430,
        bones: 3,
        amplitude: myApp.waveGraphics[waveSize].amplitude2,
        speed: .20
    });

    myApp.wave3 = $("#wave-3").wavify({
        height: 470,
        bones: 2,
        amplitude: myApp.waveGraphics[waveSize].amplitude3,
        speed: .25
    });
// }else{
//     myApp.wave1.reboot({
//         height: 400,
//         bones: 4,
//         amplitude: myApp.waveGraphics[waveSize].amplitude1,
//         speed: .15
//     });
//     myApp.wave2.reboot({
//         height: 430,
//         bones: 3,
//         amplitude: myApp.waveGraphics[waveSize].amplitude2,
//         speed: .20
//     });
//     myApp.wave3.reboot({
//         height: 470,
//         bones: 2,
//         amplitude: myApp.waveGraphics[waveSize].amplitude3,
//         speed: .25
//     });
// };
};

//display background according to user time and weather choice
myApp.displayTimeAndWeather = (time, weather) => {
    if(weather === "sunny") {
        $(".beach").css("background", myApp.background[time])
    } else {
        $(".cloudy").css({"background" : myApp.background[time], "display" : "block"});
        $(".lightning").css({"display" : "block"});
    };
};


//play audio clips according to user choices
myApp.playSoundClips = (weather, userSounds) => {
    const thunder = $(".thunder-sound")[0]
    $(".wave-sound")[0].play();
    if(weather === "stormy") {
        setTimeout(() => {
            thunder.play();
        }, 1000);
    };
    userSounds.forEach((item, index) => {
        if (item === "beers") {
            myApp.beerSoundEffect();
        } else {
            myApp.otherSoundEffects(item, index);
        }
    });
};

// beer sound effect 
myApp.beerSoundEffect = () => {
    $(".beers-sound")[0].play();

            setTimeout(() => {
                if (!$(".wave-sound")[0].paused && $(".wave-sound")[0].duration > 0){

                    $(".cheers-sound")[0].play();
                }
            }, 3000);
            $(".cheers-sound")[0].addEventListener("ended", function() {
                setTimeout(() => {
                    if (!$(".wave-sound")[0].paused && $(".wave-sound")[0].duration > 0){
                        $(".beers-sound")[0].play();
                        setTimeout(() => {
                            $(".cheers-sound")[0].play();
                        }, 3000);
                    }
                    }, 15000);
            });
     
        // };
    // }, 1000);
    
};

// sound effects for options besides beer
myApp.otherSoundEffects = (item, index) => {
    const interval = 4000;
    setTimeout(() => {
        if (!$(".wave-sound")[0].paused && $(".wave-sound")[0].duration > 0){
            $(`.${item}-sound`)[0].play();

        }
    }, index * interval);
    $(`.${item}-sound`)[0].addEventListener("ended", function() {
        setTimeout(() => {
            if (!$(".wave-sound")[0].paused && $(".wave-sound")[0].duration > 0){
                $(`.${item}-sound`)[0].currentTime = 0;
                $(`.${item}-sound`)[0].play();

            }
        }, myApp.soundDelay[item]);
    });
};

// insert exit svg into "exit" div
myApp.displayExitIcon = () => {
    $(".exit").html(`<svg class="exit-icon" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml: space="preserve"><path d="M24.762,79.088c0.507,0.508,1.173,0.762,1.838,0.762c0.665,0,1.331-0.254,1.838-0.762L50,57.527l21.562,21.562  c0.507,0.508,1.173,0.762,1.838,0.762c0.665,0,1.331-0.254,1.838-0.762c1.016-1.015,1.016-2.662,0-3.677L53.677,53.85l21.562-21.562  c1.016-1.015,1.016-2.662,0-3.677c-1.014-1.016-2.662-1.016-3.677,0L50,50.173L28.438,28.612c-1.014-1.016-2.662-1.016-3.677,0  c-1.016,1.015-1.016,2.662,0,3.677L46.324,53.85L24.762,75.412C23.746,76.427,23.746,78.073,24.762,79.088z" /></svg>`);
}

// on click remove all beach display and audio and return to landing page
myApp.exit = () => {
    $(".exit-icon").on("click", function() {
        myApp.wave1.kill();
        myApp.wave2.kill();
        myApp.wave3.kill();
        $(".wave-graphic").each(() => {
            // $(this).children("path").attr("d", "");
            console.log($(this).children("path"));
        });
        $(".landing").show();
        $(".lightning").hide();
        $(".cloudy").hide();
        $(".beach").css("background", "none");
        $(".exit").html("");
        $("audio").each(function() {
            $(this)[0].pause();
        });
        $("form")[0].reset();
    })
}

$(function(){
    myApp.init();
});

