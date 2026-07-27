const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".navButton");

function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    navButtons.forEach(btn => {
        btn.classList.remove("active");

        if (btn.dataset.screen === id) {
            btn.classList.add("active");
        }
    });
}

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showScreen(btn.dataset.screen);

        if (window.Telegram?.WebApp?.HapticFeedback) {
            Telegram.WebApp.HapticFeedback.selectionChanged();
        }
    });
});

document.getElementById("startWorkoutBtn").addEventListener("click", () => {
    alert("Workout screen coming in the next step 💪");
});

showScreen("trainScreen");
