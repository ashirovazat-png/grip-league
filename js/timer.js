const startButton = document.getElementById("startWorkoutBtn");

startButton.addEventListener("click", () => {
    document.getElementById("content").innerHTML = `
        <section class="screen active">

            <div class="card hero">

                <h2 id="phaseText">READY</h2>

                <div id="timerValue"
                     style="font-size:72px;font-weight:800;margin:25px 0;">
                    3
                </div>

                <p id="statusText">
                    Get ready...
                </p>

                <button class="primaryButton"
                        id="cancelWorkout">
                    Finish Workout
                </button>

            </div>

        </section>
    `;

    let sequence = [
        {text:"READY",seconds:3},
        {text:"SQUEEZE",seconds:5},
        {text:"RELEASE",seconds:3},
        {text:"SQUEEZE",seconds:5},
        {text:"RELEASE",seconds:3},
        {text:"DONE",seconds:0}
    ];

    let phase = 0;

    function nextPhase(){

        if(phase >= sequence.length)
            return;

        let item = sequence[phase];

        document.getElementById("phaseText").textContent = item.text;

        if(item.seconds === 0){

            document.getElementById("timerValue").textContent = "✓";

            document.getElementById("statusText").textContent =
                "Workout complete!";

            return;
        }

        let remaining = item.seconds;

        document.getElementById("timerValue").textContent = remaining;

        let interval = setInterval(()=>{

            remaining--;

            document.getElementById("timerValue").textContent = remaining;

            if(remaining<=0){

                clearInterval(interval);

                phase++;

                nextPhase();

            }

        },1000);

    }

    nextPhase();

    document
        .getElementById("cancelWorkout")
        .addEventListener("click",()=>location.reload());

});
