
const myApp = {};

//wave SVG's
myApp.waveGraphics = {
    flat:
        `<svg width="100%" height="289px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M0,9 C41.5731961,3.45572917 103.242467,0.68359375 185.007812,0.68359375 C266.773158,0.68359375 348.6742,3.45572917 430.710937,9 C516.152423,15.125 592.578205,18.1875 659.988281,18.1875 C727.398358,18.1875 794.735597,15.125 862,9 L862,289 L0,289 L0,9 Z" id="Rectangle" fill="#B4D5E1"></path>
            </g>
        </svg>
         
        <svg width="100%" height="226px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M0,8.09249146 C42.1044461,16.3511698 104.039342,20.480509 185.804687,20.480509 C267.570033,20.480509 349.20545,16.3511698 430.710937,8.09249146 C514.295653,2.69749715 589.793048,2.07458472e-15 657.203125,0 C724.613202,0 792.878827,2.69749715 862,8.09249146 L862,226 L0,226 L0,8.09249146 Z" id="Rectangle" fill="#B4E1DC"></path>
            </g>
        </svg>
        
        <svg width="100%" height="193px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M1,13.0645674 C-5.59607478,34.0568908 31.9885606,44.5530525 113.753906,44.5530525 C195.519252,44.5530525 263.309616,38.2811352 317.125,25.7373005 C382.597736,8.57910018 449.039142,7.97481872e-13 516.449219,7.95807864e-13 C583.859295,7.95807864e-13 699.376222,4.35485581 863,13.0645674 L863,193 L1,193 L1,13.0645674 Z" id="Rectangle" fill="#B4E1D0"></path>
            </g>
        </svg>
        `,
    gentle:1,
    big:1
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
        }
    });
    console.log(userSounds);
    myApp.displayWave(waveSize);
    myApp.displayTimeAndWeather(time, weather);
    myApp.playSoundClips(weather, userSounds);
};

// display waves according to user size choice
myApp.displayWave = (waveSize) => {
    $(".beach").append(myApp.waveGraphics[waveSize]);
};

//display background according to user time and weather choice
myApp.displayTimeAndWeather = (time, weather) => {
    if(weather === "sunny") {
        $(".beach").css("background", myApp.background[time])
    } else {
        $(".cloudy").css({"background" : myApp.background[time], "display" : "block"});
        $(".lightning").css({"background" : myApp.background[time], "display" : "block"});
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
        $(".cheers-sound")[0].play();
    }, 3000);
    $(".cheers-sound")[0].addEventListener("ended", function() {
        setTimeout(() => {
            $(".beers-sound")[0].play();
            setTimeout(() => {
                $(".cheers-sound")[0].play();
            }, 3000);
        }, 15000);
    });
};

// sound effects for options besides beer
myApp.otherSoundEffects = (item, index) => {
    const interval = 4000;
    setTimeout(() => {
       $(`.${item}-sound`)[0].play();
    }, index * interval);
    $(`.${item}-sound`)[0].addEventListener("ended", function() {
        setTimeout(() => {
            $(`.${item}-sound`)[0].currentTime = 0;
            $(`.${item}-sound`)[0].play();
        }, myApp.soundDelay[item]);
    });
};

$(function(){
    myApp.init();
});

