let autoCloseTimer = null;
let isHoveringDropdown = false;

function dropDown(btn) {
    if (!btn || btn.tagName !== "BUTTON") return;

    let current = btn;
    while (current && !current.classList.contains("content-in")) {
        current = current.parentElement;
    }
    if (!current) return;

    const dropdown = current.querySelector(".size-inside");
    if (!dropdown) return;

    // đóng dropdown khác
    document.querySelectorAll(".content-in.active").forEach(el => {
        if (el !== current) el.classList.remove("active");
    });

    const isOpening = !current.classList.contains("active");
    current.classList.toggle("active");

    if (isOpening) {
        setupAutoClose(current, dropdown);
    } else {
        clearTimeout(autoCloseTimer);
    }
}

function setupAutoClose(container, dropdown) {
    clearTimeout(autoCloseTimer);
    isHoveringDropdown = false;

    autoCloseTimer = setTimeout(() => {
        if (!isHoveringDropdown) {
            container.classList.remove("active");
        }
    }, 1500);

    // đảm bảo không gắn trùng
    dropdown.onmouseenter = () => {
        isHoveringDropdown = true;
        clearTimeout(autoCloseTimer);
    };

    dropdown.onmouseleave = () => {
        isHoveringDropdown = false;
        autoCloseTimer = setTimeout(() => {
            container.classList.remove("active");
        }, 1500);
    };
}

window.gamePlay = () => {

    window.location.href = "rpg_clicking.html"

}

window.websiteInfo = () => {

    window.location.href = "menu.html"

}
window.accountLog = () => {

    window.location.href = "main_acc.html"

}

window.logOut = async function () {

    if (!userSession) {
        window.location.href = "signIn_signUp.html";
        return;
    }

    // (OPTIONAL) hỏi trước khi logout
    const confirmLogout = confirm("Do you want to log out?");
    if (!confirmLogout) return;

    try {
        // (OPTIONAL) save game trước khi thoát
        if (typeof saveGame === "function") {
            await saveGame();
        }

        // Firebase logout
        await firebase.auth().signOut();

        // Xóa session local
        localStorage.removeItem("user_session");
        sessionStorage.clear();

        // Quay về trang login
        window.location.href = "signIn_signUp.html";

    } catch (error) {
        console.error("Logout error:", error);
        alert("Failed to log out!");
    }
};