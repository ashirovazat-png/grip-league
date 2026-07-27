const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe?.user;

    if (user) {
        document.getElementById("welcomeText").textContent =
            `Welcome, ${user.first_name}`;

        document.getElementById("profileName").textContent =
            `${user.first_name} ${user.last_name || ""}`.trim();

        document.getElementById("profileUsername").textContent =
            user.username ? `@${user.username}` : "";

        if (user.photo_url) {
            document.getElementById("avatar").innerHTML =
                `<img src="${user.photo_url}" alt="Avatar">`;
        }
    }
}
