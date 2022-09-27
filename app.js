$(() => {

// When player presses play button, 
    const $playBtn = $("button#start");
    const $pauseBtn = $("button#pause");
    const $resetBtn = $("button#reset");

    let points = 0;

    let startGame;

    const timer = $("#timer")

    let timerInterval;
    let pauseTimer;

    // const cursor = $("img");

// // to have an image as the cursor

//     $("body").on("mouseover", (e) => {
//         cursor.style.top = e.pageY + "px";
//         cursor.style.left = e.pageX + "px";
//     })

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
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;
            timer.text(`${minutes} : ${seconds}`);
            time--;
                // When timer reaches zero, end game "congratulations, you got (score) cats in the bag!"
                if (time < 0) {
                    clearInterval(timerInterval);
                    clearInterval(startGame);
                    confirm (`Wowza! You got ${points} cats in the bag!`);
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







})
