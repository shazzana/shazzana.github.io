$(() => {

// When player presses play button, 
    const $playBtn = $("button#start");
    const $pauseBtn = $("<button>").addClass("button").attr("id", "pause");
    const $pauseIcon = $("<i>").addClass("fa-solid fa-pause").text("Pause");
    $pauseBtn.append($pauseIcon)
    const $resetBtn = $("button#reset");
    const $buttonHover = $("#button-hover");
    const $buttonClick = $("#button-click");
    const $gameAudio = $("#game-audio");
    const $endGame = $("#endgame");
    const $catch = $("#catch");

    $(".button").on("mouseover", () => {
        $buttonHover.get(0).play();
    }).on("click", () => {
        $buttonClick.get(0).play();
    });


    let points = 0;

    let startGame;

    const timer = $("#timer")

    let timerInterval;
    let pauseTimer;

// a random window will show cat for an amount of time, then hide it
    
    
    const catAppears = () => {
        console.log("hello");
        const randomBox = parseInt(Math.floor(Math.random() * 6));
        const cat = $("<img>").attr("src", "./cat.png").addClass("cat")
        $("#box"+randomBox).append(cat);
        setTimeout(() => {
            $(".cat").remove();
        }, 900);


// If player clicks on cat, something happens
        $(".cat").on("click", () => {
            console.log("I clicked on a cat!");
            $catch.get(0).play();
            // create function to add points everytime player clicks on a cat (variable declared outside of scope)
            points++ ;
            $("#score").text(points);
        })
    }
    

    const catAppearsInt = () => {
        startGame = setInterval(catAppears, 2000);
    }

    const pauseGame = () => {
        clearInterval(startGame);
    }

    const startingMinutes = 1;
    let time = startingMinutes * 60;

    const startTimer = () => {

        const updateCountdown = () => {
            // Original code
            time--;
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timer.text(`${minutes} : ${seconds}`);

                // When timer reaches zero, end game "congratulations, you got (score) cats in the bag!"
                if (time < 0) {
                    console.log(seconds);
                    clearInterval(timerInterval);
                    clearInterval(startGame);
                    $gameAudio.get(0).pause();
                    $endGame.get(0).play();
                    confirm (`Wowza! You got ${points} cats in the bag!`);
                    timer.text(`0 : 00`);
                    location.reload(true);
                }
            }

    timerInterval = setInterval(updateCountdown, 1000);
    }

    pauseTimer = () => { 
        clearInterval(timerInterval);
    }

    $playBtn.on("click", () => {
        console.log("play");
        catAppearsInt();
        startTimer();
        $playBtn.remove();
        $(".start-pause").append($pauseBtn);
        $gameAudio.get(0).play();
        $pauseBtn.on("click", () => {
            console.log("pause");
            pauseGame();
            pauseTimer();
            $pauseBtn.remove();
            $(".start-pause").append($playBtn);
            $gameAudio.get(0).pause();
        })
    })
// boolean => is it pause/not pause, global 
    $pauseBtn.on("click", () => {
        console.log("pause");
        pauseGame();
        pauseTimer();
        $pauseBtn.remove();
        $(".start-pause").append($playBtn);
        $gameAudio.get(0).pause();
        $playBtn.on("click", () => {
            console.log("play");
            catAppearsInt();
            startTimer();
            $playBtn.remove();
            $(".start-pause").append($pauseBtn);
            $gameAudio.get(0).play();
        })
    })

    $resetBtn.on("click", () => {
        $gameAudio.get(0).pause();
        confirm (`So soon??? You only got ${points} cats in the bag!`);
        location.reload(true);
    })


// Timer will start counting down

})
