/*=========================
    USER SESSION CHECK
=========================*/
if (!userSession) {
    window.location.href = "signIn_signUp.html";
}

/* GAME START UPGRADE */


/*=========================
    CORE GAME VARIABLES
=========================*/
let scoreValue = 0;
let clickPower = 1;
let clickMultiple = 1;
let totalClicks = 0;

let currentBgUrl = null;
let claimedArray = [];


/*=========================
    ACHIEVEMENT STATE
=========================*/
let isAchievementOpen = false;

/*=========================
    DOM ELEMENTS
=========================*/
const score = document.getElementById("score");
const clickSpace = document.getElementById("button-click-place");

const lvClick = document.getElementById("lv");
const lvMulti = document.getElementById("lv-1");
const lvClick_1 = document.getElementById("lv-2");
const lvMulti_1 = document.getElementById("lv-3");
const lvClick_2 = document.getElementById("lv-4");
const lvMulti_2 = document.getElementById("lv-5");
const lvClick_3 = document.getElementById("lv-6");
const lvMulti_3 = document.getElementById("lv-7");


const moneyClick = document.getElementById("money-cost");
const moneyMulti = document.getElementById("money-cost-1");
const moneyClick_1 = document.getElementById("money-cost-2");
const moneyMulti_1 = document.getElementById("money-cost-3");
const moneyClick_2 = document.getElementById("money-cost-4");
const moneyMulti_2 = document.getElementById("money-cost-5");
const moneyClick_3 = document.getElementById("money-cost-6");
const moneyMulti_3 = document.getElementById("money-cost-7");


const buyButtons = document.querySelectorAll(".buy");
const storeList = document.getElementById("store");


const none_1 = document.getElementById("none-1")
const none_2 = document.getElementById("none-2")
const none_3 = document.getElementById("none-3")
const none_4 = document.getElementById("none-4")
const none_5 = document.getElementById("none-5")
const none_6 = document.getElementById("none-6")

const none_collection = [none_1,none_2,none_3,none_4,none_5,none_6]

/*=========================
    UTILITY FUNCTIONS
=========================*/
function parseMoney(el) {
    return parseInt(el.innerText.replace(/\D/g, ""), 10);
}

function getClickValue() {
    return Number((clickPower * clickMultiple * multi_pow).toFixed(1));
}

function updateScore() {
    score.textContent = `$: ${formatMoney(scoreValue)}`;
}


setInterval(() => {

    for(let i = 0; i<(upgrades.length-2);i++){

        if(upgrades[i].level >= 25){

            none_collection[i].style.display = "grid"

        }

    }

},100)

/*=========================
    UPGRADE LIST
=========================*/
const upgrades = [
    {
        level: 1,
        cost: parseMoney(moneyClick),
        levelEl: lvClick,
        costEl: moneyClick,
        apply() {
            clickPower++;
        },
        nextCost() {
            return Math.ceil(this.cost * 1.2);
        }
    },
    {
        level: 1,
        cost: parseMoney(moneyMulti),
        levelEl: lvMulti,
        costEl: moneyMulti,
        apply() {
            clickMultiple = Number((clickMultiple+= 0.2).toFixed(1));
        },
        nextCost() {
            return Math.ceil(this.cost * 1.4);
        }
    },
    {
        level: 1,
        cost: parseMoney(moneyClick_1),
        levelEl: lvClick_1,
        costEl: moneyClick_1,
        apply() {
            clickPower+= 3;
        },
        nextCost() {
            return Math.ceil(this.cost * 1.3);
        }
    },
    {
        level: 1,
        cost: parseMoney(moneyMulti_1),
        levelEl: lvMulti_1,
        costEl: moneyMulti_1,
        apply() {
            clickMultiple = Number((clickMultiple+= 0.5).toFixed(1));
        },
        nextCost() {
            return Math.ceil(this.cost * 1.7);
        }
    },
    {
        level: 1,
        cost: parseMoney(moneyClick_2),
        levelEl: lvClick_2,
        costEl: moneyClick_2,
        apply() {
            clickPower+=6;
        },
        nextCost() {
            return Math.ceil(this.cost * 1.7);
        }
    },
    {
        level: 1,
        cost: parseMoney(moneyMulti_2),
        levelEl: lvMulti_2,
        costEl: moneyMulti_2,
        apply() {
            clickMultiple = Number((clickMultiple+= 1).toFixed(1));
        },
        nextCost() {
            return Math.ceil(this.cost * 2.5);
        }
    },
    {
        level: 1,
        cost: parseMoney(moneyClick_3),
        levelEl: lvClick_3,
        costEl: moneyClick_3,
        apply() {
            clickPower+=10;
        },
        nextCost() {
            return Math.ceil(this.cost * 2.5);
        }
    },
    {
        level: 1,
        cost: parseMoney(moneyMulti_3),
        levelEl: lvMulti_3,
        costEl: moneyMulti_3,
        apply() {
            clickMultiple = Number((clickMultiple+= 2.75).toFixed(1));
        },
        nextCost() {
            return Math.ceil(this.cost * 3.2);
        }
    }
];

/*=========================
    INIT UI
=========================*/
upgrades.forEach(upg => {
    upg.levelEl.textContent = `Level ${upg.level}`;
    upg.costEl.textContent = `${formatMoney(upg.cost)}$`;
});
updateScore();

/*=========================
    CLICK HANDLER
=========================*/
clickSpace.addEventListener("click", (e) => {
    const gain = getClickValue();
    scoreValue += gain;
    totalClicks++;
    updateScore();

    const rect = clickSpace.getBoundingClientRect();
    const plus = document.createElement("div");

    plus.textContent = `+${formatMoney(gain)}`;
    plus.style.position = "absolute";
    plus.style.left = (e.clientX - rect.left) + "px";
    plus.style.top = (e.clientY - rect.top) + "px";
    plus.style.color = "red";
    plus.style.fontSize = "26px";
    plus.style.fontWeight = "bold";
    plus.style.pointerEvents = "none";
    plus.style.transition = "all 0.7s ease";

    clickSpace.appendChild(plus);

    setTimeout(() => {
        plus.style.transform = "translateY(-40px)";
        plus.style.opacity = "0";
    }, 10);

    setTimeout(() => plus.remove(), 700);

    updateAllProgressBars();
});

/*=========================
    BUY UPGRADE
=========================*/
function buyUpgrade(index) {
    const upg = upgrades[index];
    if (scoreValue < upg.cost) return;

    scoreValue -= upg.cost;
    upg.level++;
    upg.apply();
    upg.cost = upg.nextCost();

    upg.levelEl.textContent = `Level ${upg.level}`;
    upg.costEl.textContent = `${formatMoney(upg.cost)}$`;
    updateScore();
}

buyButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => buyUpgrade(i));
});

/*=========================
    AUTO CLICK
=========================*/
setInterval(() => {
    scoreValue += getClickValue();
    updateScore();
    updateAllProgressBars();
}, 1000);

/*=========================
    LOAD STORE
=========================*/
window.loadStore = function () {
    isAchievementOpen = false;

    fetch("../json/items_list.json")
        .then(res => res.json())
        .then(list => {
            let html = "";
            list.forEach(item => {
                html += `
                    <div class="purchase-items tab-release">
                        <div class="image-ex" style="background-image:url('${item.background}')"></div>
                        <span class="money-total">${formatMoney(item.cost)}$</span>
                        <span class="money-total">x${item.multi} multiples</span>
                        <button class="btn-purchase"
                            onclick="purchaseCart('${item.background}',${item.cost},${item.multi})">
                            Purchase
                        </button>
                    </div>
                `;
            });
            storeList.innerHTML = html;
        });
};

/* =========================
   BILL / CART MANAGER
========================= */

const BillManager = (() => {

    const getUserRef = () => {
        if (!userSession) return null;
        return db.collection("products").doc(userSession.uid);
    };

    
    

    /* =========================
       LOAD BILL
    ========================= */
    const loadBill = async () => {

        const ref = getUserRef();
        if (!ref) return;

        storeList.innerHTML = `
            <div id="storage" class="storage">
                <div id="bill-list" class="fetch-store">Đang tải...</div>
                <div class="purchase-btn">
                    <input type="button" class="typical" value="Purchase"
                        onclick="BillManager.purchaseAll()">
                </div>
            </div>
        `;

        try {
            const snap = await ref.get();
            const billList = document.getElementById("bill-list");

            const purchases = snap.data()?.purchases ?? [];

            if (!purchases.length) {
                billList.innerHTML =
                    `<p style="text-align:center;color:gold">🛒 Cart is empty!</p>`;
                document.getElementById("total-price").textContent = "Total: 0$";
                return;
            }

            let html = "";
            let total = 0;

            purchases.forEach(item => {
                total += item.cost * item.quantity;

                html += `
                    <div class="store-product">
                        <div class="image-ex"
                            style="background-image:url('${item.bg_url}')"></div>

                        <span class="money-total">
                            ${formatMoney(item.cost * item.quantity)}$
                        </span>

                        <span class="money-total">
                            x${item.multi} multi
                        </span>

                        <div>
                            <button class="minus-product"
                                ${item.quantity === 1 ? "disabled" : ""}
                                onclick="BillManager.decrease('${item.bg_url}')">-</button>

                            <span class="quantity">${item.quantity}</span>

                            <button class="plus-product"
                                onclick="BillManager.increase('${item.bg_url}')">+</button>
                        </div>
                    </div>
                `;
            });

            billList.innerHTML = html;
            document.getElementById("total-price").textContent =
                `Total: ${formatMoney(total)}$`;

        } catch (err) {
            console.error("Load bill error:", err);
        }
    };

    /* =========================
       INCREASE
    ========================= */
    const increase = async (bg_url) => {
        const ref = getUserRef();
        if (!ref) return;

        const snap = await ref.get();
        if (!snap.exists) return;

        const purchases = snap.data().purchases || [];
        const item = purchases.find(p => p.bg_url === bg_url);
        if (!item) return;

        item.quantity += 1;

        await ref.update({ purchases });
        loadBill();
    };

    /* =========================
       DECREASE
    ========================= */
    const decrease = async (bg_url) => {
        const ref = getUserRef();
        if (!ref) return;

        const snap = await ref.get();
        if (!snap.exists) return;

        let purchases = snap.data().purchases || [];
        const index = purchases.findIndex(p => p.bg_url === bg_url);
        if (index === -1) return;

        if (purchases[index].quantity > 1) {
            purchases[index].quantity -= 1;
        } else {
            purchases.splice(index, 1);
        }

        await ref.update({ purchases });
        loadBill();
    };

    /* =========================
       PURCHASE → APPLY BONUS
    ========================= */
    const purchaseAll = async () => {

        const ref = getUserRef();
        if (!ref) return;

        const snap = await ref.get();
        if (!snap.exists) return;

        const purchases = snap.data().purchases || [];
        if (!purchases.length) return;

        let totalCost = 0;
        let bonusMulti = 0;

        purchases.forEach(item => {
            totalCost += item.cost * item.quantity;
            bonusMulti += item.multi * item.quantity;
        });

        if (scoreValue < totalCost) {
            alert("❌ Not enough money");
            return;
        }

        // trừ tiền
        scoreValue -= totalCost;

        // cộng multiplier
        clickMultiple = Number((clickMultiple + bonusMulti).toFixed(2));

        // clear cart
        await ref.update({ purchases: [] });

        updateScore();
        loadBill();

        alert(`Purchased +${bonusMulti} multiplier`);
    };

    return {
        loadBill,
        increase,
        decrease,
        purchaseAll
    };

    

})();

/* expose global */
window.loadBill = BillManager.loadBill;




/* =========================
   PURCHASE
========================= */
window.purchaseCart = async function (bg_url, cost_items, multi_coins) {

    if (!firebase.auth().currentUser) {
        alert("No account identifed");
        return;
    }

    const uid = firebase.auth().currentUser.uid;
    const userRef = db.collection("products").doc(uid);

    try {
        const doc = await userRef.get();
        let purchases = [];

        if (doc.exists) {
            purchases = doc.data().purchases || [];
        }

        // 🔍 kiểm tra sản phẩm đã tồn tại chưa
        const index = purchases.findIndex(
            item => item.bg_url === bg_url
        );

        if (index !== -1) {
            // ✅ đã tồn tại → tăng quantity
            purchases[index].quantity += 1;
        } else {
            // ❌ chưa tồn tại → thêm mới
            purchases.push({
                bg_url,
                cost: cost_items,
                multi: multi_coins,
                quantity: 1,
                time: Date.now()
            });
        }

        // 💾 lưu lại toàn bộ mảng
        await userRef.set({ purchases }, { merge: true });

        alert("Added to cart");
        console.log("Updated purchases:", purchases);

    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
    }

    
};




/*=========================
    ACHIEVEMENT (FULL)
=========================*/
window.loadAchievement = function () {
    isAchievementOpen = true;

    fetch("../json/achievement.json")
        .then(res => res.json())
        .then(list => {
            let html = "";

            list.forEach((ach, index) => {
                const requireText = ach.money_made
                    ? `${ach.money_made}`
                    : `${ach.click_times}`;

                const claimed = claimedArray.includes(index);
                const reward = Number(ach.reward) || 0;

                html += `
                    <div class="achieve-log"
                        data-index="${index}"
                        data-reward="${reward}"
                        data-require="${ach.money_made || ach.click_times}"
                        data-type="${ach.money_made ? "money" : "click"}">

                        <img src="../Picture/click.png">

                        <div class="achieve-item-log">
                            <span class="requirement">${requireText}</span>
                            <div class="progress">
                                <div class="progress-bar"></div>
                                <span class="percent">0%</span>
                            </div>
                        </div>

                        <button class="completed" disabled>
                            ${claimed ? "Claimed" : "Uncompleted"}
                        </button>
                    </div>
                `;
            });

            storeList.innerHTML = html;
            updateAllProgressBars();
        });
};


window.updateAllProgressBars = function () {

    const list = document.querySelectorAll(".achieve-log");
    if (!list.length) return;

    list.forEach(item => {

        const index = Number(item.dataset.index);
        const reward = Number(item.dataset.reward) || 0;

        const require = parseInt(
            item.dataset.require.replace(/\D/g, ""),
            10
        );

        const type = item.dataset.type;
        if (!require || require <= 0) return;

        const bar = item.querySelector(".progress-bar");
        const percentText = item.querySelector(".percent");
        const btn = item.querySelector(".completed");

        const current =
            type === "money" ? scoreValue : totalClicks;

        const percent = Math.min(
            Math.floor((current / require) * 100),
            100
        );

        bar.style.width = percent + "%";
        percentText.textContent = percent + "%";

        if (claimedArray.includes(index)) {
            btn.textContent = "Claimed";
            btn.disabled = true;
        }
        else if (percent >= 100) {
            btn.textContent = "Claim";
            btn.disabled = false;
            btn.onclick = () => claimReward(index, reward);
        }
        else {
            btn.textContent = "Uncompleted";
            btn.disabled = true;
        }
    });
};


/*=========================
    BONUS: OPTIMIZED UPDATE
=========================*/

/*=========================
    CLAIM REWARD
=========================*/
window.claimReward = function (index, reward) {
    if (claimedArray.includes(index)) return;

    claimedArray.push(index);
    scoreValue += reward;

    updateScore();
    updateAllProgressBars();
    saveGame();
};


/*=========================
    USER STATUS
=========================*/
window.loadStatus = function () {
    isAchievementOpen = false;

    storeList.innerHTML = `
        <div class="user-status">
            <h2>👤 User Status</h2>
            <p><b>UID:</b> ${userSession.uid}</p>
            <p><b>Email:</b> ${userSession.email || "N/A"}</p>
            <p><b>Total Clicks:</b> ${totalClicks}</p>
            <p><b>Money:</b> $${formatMoney(scoreValue)}</p>
            <p><b>Click Power:</b> ${clickPower}</p>
            <p><b>Multiplier:</b> x${clickMultiple * multi_pow}</p>
            <button onclick="logOut()">Log out</button>
            <button onclick="goBack()">Back to menu</button>
        </div>
    `;
};

/*=========================
    BACKGROUND CHANGE
=========================*/
window.loadBackground = function () {
    isAchievementOpen = false;

    storeList.innerHTML = `
        <form id="photo_upload" class="photo_upload">
            <div class="uploading" id="uploadPreview">
                <label>📸</label>
                <input type="file" id="image_uploading" hidden accept="image/*">
            </div>
            <div class="accept">
                <button type="submit" class="saveBtn">Apply</button>
                <button type="reset" class="resetBtn">Reset</button>
            </div>
        </form>
    `;
    initBackgroundUpload();
};
function initBackgroundUpload() {
    const form = document.getElementById("photo_upload");
    const fileInput = document.getElementById("image_uploading");
    const previewBox = document.getElementById("uploadPreview");
    const place = document.querySelector(".place-to-click");

    if (!form || !fileInput || !previewBox || !place) return;

    // mở chọn file
    previewBox.addEventListener("click", () => {
        fileInput.click();
    });

    // preview ảnh
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("File has to be an image!");
            fileInput.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = e => {
            previewBox.style.backgroundImage = `url('${e.target.result}')`;
            previewBox.classList.add("has-image");
        };
        reader.readAsDataURL(file);
    });

    // upload cloudinary
    form.addEventListener("submit", async e => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            alert("Please choose an image!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "photos");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dvj0og4ia/image/upload",
                { method: "POST", body: formData }
            );

            const data = await res.json();
            if (!data.secure_url) throw new Error("Đăng lên thất bại");

            place.style.backgroundImage = `url('${data.secure_url}')`;
            place.style.backgroundSize = "cover";
            place.style.backgroundPosition = "center";
            place.style.backgroundRepeat = "no-repeat";

            alert("Success uploading!");
        } catch (err) {
            console.error(err);
            alert("Failed uploading");
        }
    });

    // reset
    form.addEventListener("reset", () => {
        previewBox.style.backgroundImage = "";
        previewBox.classList.remove("has-image");
        place.style.background = "none"
        fileInput.value = "";
    });
}

/* ======================================
   POWER CHANGE – FIXED
====================================== */

const powerBtns = document.querySelectorAll(".power-change button");
const upgradeItems = document.querySelectorAll(".buy-click");
const power_list_form = document.getElementById("power-list")

/* ẨN TẤT CẢ UPGRADE */
function hideUpgrade() {
    upgradeItems.forEach(item => {
        item.classList.add("force-hide");
    });

    power_list_form.style.display = "flex"
}

/* HIỆN UPGRADE – TÔN TRỌNG CSS */
function showUpgrade() {
    upgradeItems.forEach(item => {
        item.classList.remove("force-hide");
    });

    power_list_form.style.display = "none"
}

/* EVENT */
powerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.textContent.includes("🔥")) showUpgrade();
        if (btn.textContent.includes("⬆️")) hideUpgrade();
    });
});

window.innerPower = async () => {

    fetch("../json/power_list.json")
        .then(res => res.json())
        .then(power => {

            let inPower = "";

            power.forEach(inside => {

                const isBought = boughtArray.includes(inside.id);

                inPower += `
                    <div class="power-show-list"
                        style="${isBought ? "display:none" : ""}">

                        <span>🌋</span>

                        <div id="${inside.id}" class="power-detail">
                            <span>${inside.title}</span>
                            <span>${formatMoney(inside.cost)}$</span>
                            <span>x${inside.multi}</span>
                        </div>

                        <button class="purchasing"
                            onclick="purchaseMult('${inside.id}', ${inside.cost}, ${inside.multi})">
                            Purchase
                        </button>

                    </div>
                `;
            });

            document.getElementById("power-list").innerHTML = inPower;
        });
};

innerPower()


let multi_pow = 1
let boughtArray = []

window.purchaseMult = async (uid, costly, mult) => {

    if (!userSession) {
        window.location.href = "signIn_signUp.html";
        return;
    }

    // ❌ đã mua rồi → không cho mua lại
    if (boughtArray.includes(uid)) return;

    if (costly <= scoreValue) {

        scoreValue -= costly;
        multi_pow *= mult;

        // ✅ lưu id power đã mua
        boughtArray.push(uid);

        // ✅ ẩn UI
        const item = document.getElementById(uid)
            ?.closest(".power-show-list");
        if (item) item.style.display = "none";

        updateScore();
        saveGame(); // 🔥 save ngay
    }
};










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

window.goBack = async () => {

    window.location.href = "menu.html"

}











/*=========================
    FIREBASE SAVE / LOAD
    NO RESET – NO REBUILD
=========================*/

/* ===== SAVE GAME ===== */
const saveGame = async () => {
    if (!userSession) return;

    try {
        await db.collection("gameData")
            .doc(userSession.uid)
            .set({
                uid: userSession.uid,
                email: userSession.email || null,

                scoreValue,
                totalClicks,
                clickPower,
                clickMultiple,
                multi_pow,

                upgrades: {
                    clickPower: {
                        level: upgrades[0].level,
                        cost: upgrades[0].cost
                    },
                    clickMultiple: {
                        level: upgrades[1].level,
                        cost: upgrades[1].cost
                    },
                    clickPower_1: {
                        level: upgrades[2].level,
                        cost: upgrades[2].cost
                    },
                    clickMultiple_1: {
                        level: upgrades[3].level,
                        cost: upgrades[3].cost
                    },
                    clickPower_2: {
                        level: upgrades[4].level,
                        cost: upgrades[4].cost
                    },
                    clickMultiple_2: {
                        level: upgrades[5].level,
                        cost: upgrades[5].cost
                    },
                    clickPower_3: {
                        level: upgrades[6].level,
                        cost: upgrades[6].cost
                    },
                    clickMultiple_3: {
                        level: upgrades[7].level,
                        cost: upgrades[7].cost
                    }
                },
                buyMult: boughtArray,

                achievementsClaimed: claimedArray,
                backgroundUrl: currentBgUrl,

                lastSave: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

    } catch (err) {
        console.error("Save game error:", err);
    }
};


/* ===== LOAD GAME ===== */
const loadGame = async () => {
    if (!userSession) return;

    try {
        const doc = await db
            .collection("gameData")
            .doc(userSession.uid)
            .get();

        if (!doc.exists) return;

        const data = doc.data();

        /* ===== CORE (GIỮ NGUYÊN) ===== */
        scoreValue    = data.scoreValue    ?? scoreValue;
        totalClicks   = data.totalClicks   ?? totalClicks;
        clickPower    = data.clickPower    ?? clickPower;
        clickMultiple = data.clickMultiple ?? clickMultiple;
        multi_pow     = data.multi_pow     ?? multi_pow;


        boughtArray = data.buyMult ?? boughtArray
        claimedArray  = data.achievementsClaimed ?? claimedArray;
        currentBgUrl  = data.backgroundUrl ?? currentBgUrl;

        /* ===== UPGRADES (SET TRỰC TIẾP) ===== */
        if (data.upgrades && upgrades?.length) {

            const map = [
                "clickPower",
                "clickMultiple",
                "clickPower_1",
                "clickMultiple_1",
                "clickPower_2",
                "clickMultiple_2",
                "clickPower_3",
                "clickMultiple_3"
            ];

            map.forEach((key, i) => {
                if (!data.upgrades[key]) return;

                upgrades[i].level = data.upgrades[key].level ?? upgrades[i].level;
                upgrades[i].cost  = data.upgrades[key].cost  ?? upgrades[i].cost;

                upgrades[i].levelEl.textContent = `Level ${upgrades[i].level}`;
                upgrades[i].costEl.textContent  = `${formatMoney(upgrades[i].cost)}$`;
            });
        }

        /* ===== BACKGROUND ===== */
        if (currentBgUrl) {
            const place = document.querySelector(".place-to-click");
            if (place) {
                place.style.backgroundImage = `url('${currentBgUrl}')`;
            }
        }

        innerPower()

        updateScore();

    } catch (err) {
        console.error("Load game error:", err);
    }
};


/*=========================
    AUTO SAVE / LOAD
=========================*/

setInterval(() => {
    if (userSession) saveGame();
}, 10000);

window.addEventListener("beforeunload", () => {
    if (userSession) saveGame();
});

window.addEventListener("load", () => {
    loadGame();
});

/* =========================
   FORMAT MONEY (K → Ud)
========================= */
function formatMoney(num) {
    if (num === null || num === undefined) return "0";

    const units = [
        "", "K", "M", "B", "T",
        "Qa", "Qi", "Sx", "Sp",
        "Oc", "No", "Dc", "Ud"
    ];

    let unitIndex = 0;
    let value = Number(num);

    while (value >= 1000 && unitIndex < units.length - 1) {
        value /= 1000;
        unitIndex++;
    }

    return value % 1 === 0
        ? value + units[unitIndex]
        : value.toFixed(2) + units[unitIndex];
}