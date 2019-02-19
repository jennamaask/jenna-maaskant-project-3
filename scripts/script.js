// variables
const $beach = $(".beach");
const $form = $("form");
const $landing = $(".landing");
const $lightning = $(".lightning");
const $cloudy = $(".cloudy");
const $waveSound = $(".wave-sound")[0];
const $beerSound = $(".beers-sound")[0];
const $cheersSound = $(".cheers-sound")[0];
const $exit = $(".exit");

// myApp object
const myApp = {};

//wave SVG inputs
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

// value of delay between different sounds
myApp.soundDelay = {
    boats: 10000,
    birds: 2000
};

// words for svg description tag
myApp.descriptiveWords = {
    flat: "no waves",
    gentle: "gentle swell",
    big: "big waves",
    sunrise: "sunrise or sunset",
    day: "day time",
    night: "night time",
    sunny: "sunny",
    stormy: "stormy"
}

// event listener for submit
myApp.init = () => {
    $form.on("submit", function(e){
        e.preventDefault();
        myApp.determineUserInput();
        $landing.hide();
        myApp.displayExitIcon();
        myApp.exit();
    });
};

// get values from form and initilize display and audio functions
myApp.determineUserInput = () => {
    const waveSize = $(`input[name="wave-size"]:checked`).val();
    const time = $(`input[name="time-of-day"]:checked`).val();
    const weather = $(`input[name="weather"]:checked`).val();
    const sounds = ["birds", "beers", "boats"];
    const userSounds = sounds.filter((item) => {
        if ($(`input[name=${item}]`).prop("checked") == true) {
            return item;
        };
    });
    $beach.css("height", "100vh");
    myApp.displayWave(waveSize);
    myApp.displayTimeAndWeather(time, weather);
    myApp.playSoundClips(weather, userSounds);
    myApp.createSvgDescription(waveSize, time, weather);
};

// display waves according to user size choice
myApp.displayWave = (waveSize) => {
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
};

//display background according to user time and weather choice
myApp.displayTimeAndWeather = (time, weather) => {
    if (weather === "sunny") {
        $beach.css("background", myApp.background[time])
    } else {
        $cloudy.css({"background" : myApp.background[time], "display" : "block"});
        $lightning.css("display", "block");
    };
};

//play audio clips according to user choices
myApp.playSoundClips = (weather, userSounds) => {
    $waveSound.play();
    if (weather === "stormy") {
        setTimeout(() => {
            $(".thunder-sound")[0].play();
        }, 1000);
    };
    userSounds.forEach((item, index) => {
        myApp.soundEffects(item, index);
    });
};

// beer sound effect 
myApp.beerSoundEffect = () => {
    $beerSound.play();
    setTimeout(() => {
        if (!$waveSound.paused && $waveSound.duration > 0){
            $cheersSound.play();
        }
    }, 3000);
    $cheersSound.addEventListener("ended", function() {
        setTimeout(() => {
            if (!$waveSound.paused && $waveSound.duration > 0){
                $beerSound.play();
                setTimeout(() => {
                    $cheersSound.play();
                }, 3000);
            }
        }, 8000);
    });   
};

// sound effects for options besides beer
myApp.soundEffects = (item, index) => {
    const interval = 4000;
    setTimeout(() => {
        if (!$waveSound.paused && $waveSound.duration > 0){
            if (item === "beers") {
                myApp.beerSoundEffect();
            } else {
                $(`.${item}-sound`)[0].play();
                $(`.${item}-sound`)[0].addEventListener("ended", function() {
                    setTimeout(() => {
                        if (!$waveSound.paused && $waveSound.duration > 0){
                            $(`.${item}-sound`)[0].currentTime = 0;
                            $(`.${item}-sound`)[0].play();
                        };
                    }, myApp.soundDelay[item]);
                });
            };
        };
    }, index * interval);
};

// create desciption for wave SVG to make it more accesible
myApp.createSvgDescription = (waveSize, time, weather) => {
    $("#beach-description").html(`An ocean with ${myApp.descriptiveWords[waveSize]} during ${myApp.descriptiveWords[time]} with ${myApp.descriptiveWords[weather]} weathers.`);
}

// insert exit svg into "exit" div
myApp.displayExitIcon = () => {
    $exit.html(`<svg class="exit-icon" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml: space="preserve" aria-labelledby="exit-title" role="img"><title id="exit-title">Exit button</title><path d="M24.762,79.088c0.507,0.508,1.173,0.762,1.838,0.762c0.665,0,1.331-0.254,1.838-0.762L50,57.527l21.562,21.562  c0.507,0.508,1.173,0.762,1.838,0.762c0.665,0,1.331-0.254,1.838-0.762c1.016-1.015,1.016-2.662,0-3.677L53.677,53.85l21.562-21.562  c1.016-1.015,1.016-2.662,0-3.677c-1.014-1.016-2.662-1.016-3.677,0L50,50.173L28.438,28.612c-1.014-1.016-2.662-1.016-3.677,0  c-1.016,1.015-1.016,2.662,0,3.677L46.324,53.85L24.762,75.412C23.746,76.427,23.746,78.073,24.762,79.088z" /></svg>`);
};

// on click remove all beach display and audio and return to landing page
myApp.exit = () => {
    $(".exit-icon").on("click", function() {
        myApp.wave1.kill();
        myApp.wave2.kill();
        myApp.wave3.kill();
        $beach.css("height", "0px");
        $landing.show();
        $lightning.hide();
        $cloudy.hide();
        $beach.css("background", "none");
        $exit.html("");
        $("audio").each(function() {
            $(this)[0].pause();
            $(this)[0].currentTime = 0;
        });
        $form[0].reset();
    });
};

// document ready
$(function(){
    myApp.init();
});

