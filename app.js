$(() => {

// When player presses play button, 
    const $playBtn = $("button#start");
    const $pauseBtn = $("button#pause");
    const $resetBtn = $("button#reset")



// a random window will show cat for an amount of time, then hide it
    let points = 0;
    
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

    const startTime = 1;
    let time = startTime * 60;

    const countdownEl = $("#timer")
    
    const updateCountdown = () => {
        const minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.text(`${minutes} : ${seconds}`)
        time--;
    }

    const timerInterval = () => {
        startTimer = setInterval(updateCountdown, 1000);
    }

    const pauseTimer = () => {
        clearInterval(startTimer);
    }

    $playBtn.on("click", () => {
        console.log("play");
        catAppearsInt();
        timerInterval();
    })

    $pauseBtn.on("click", () => {
        console.log("pause");
        pauseGame();
        pauseTimer();
    })

    $resetBtn.on("click", () => {
        location.reload(true);
    })


// Timer will start counting down





// When timer reaches zero, end game "congratulations, you got (score) cats in the bag!"

})
