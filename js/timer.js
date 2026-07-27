const startButton = document.getElementById("startWorkoutBtn");

startButton.addEventListener("click", startWorkout);

function value(id) {
    return parseInt(document.getElementById(id).value, 10);
}

let config = {};
let state = {};

function startWorkout() {

    config = {
        ready: value("readyInput"),
        squeeze: value("squeezeInput"),
        release: value("releaseInput"),
        handSwitch: value("switchInput"),
        reps: value("repsInput"),
        sets: value("setsInput")
    };

    state = {
        hand: "LEFT",
        rep: 1,
        set: 1
    };

    runReady();
}

function workoutScreen(title, seconds, status) {

    document.getElementById("content").innerHTML = `
        <section class="screen active">

            <div class="card hero">

                <h2 id="phase">${title}</h2>

                <div id="time"
                     style="
                     font-size:90px;
                     font-weight:800;
                     margin:30px 0;">
                     ${seconds}
                </div>

                <p>${status}</p>

                <p style="margin-top:20px;">
                    ${state.hand} HAND
                </p>

                <p>
                    Rep ${state.rep}/${config.reps}
                    •
                    Set ${state.set}/${config.sets}
                </p>

            </div>

        </section>
    `;

}

function countdown(seconds, finished) {

    workoutScreen(
        document.getElementById("phase")?.textContent || "",
        seconds,
        ""
    );

    let remaining = seconds;

    document.getElementById("time").textContent = remaining;

    const timer = setInterval(() => {

        remaining--;

        document.getElementById("time").textContent = remaining;

        if (remaining <= 0) {

            clearInterval(timer);

            finished();

        }

    }, 1000);

}

function runReady() {

    workoutScreen(
        "READY",
        config.ready,
        "Prepare..."
    );

    countdown(config.ready, runSqueeze);

}

function runSqueeze() {

    workoutScreen(
        "SQUEEZE",
        config.squeeze,
        "Close the gripper."
    );

    countdown(config.squeeze, runRelease);

}

function runRelease() {

    workoutScreen(
        "RELEASE",
        config.release,
        "Open slowly."
    );

    countdown(config.release, completeRep);

}

function completeRep() {

    if (state.rep < config.reps) {

        state.rep++;

        runReady();

        return;

    }

    if (state.hand === "LEFT") {

        state.hand = "RIGHT";

        state.rep = 1;

        workoutScreen(
            "SWITCH HAND",
            config.handSwitch,
            "Change hands."
        );

        countdown(config.handSwitch, runReady);

        return;

    }

    if (state.set < config.sets) {

        state.set++;

        state.hand = "LEFT";

        state.rep = 1;

        workoutScreen(
            "NEXT SET",
            config.handSwitch,
            "Get ready."
        );

        countdown(config.handSwitch, runReady);

        return;

    }

    workoutScreen(
        "DONE ✓",
        0,
        "Workout complete!"
    );

    document.getElementById("time").textContent = "✓";

}
