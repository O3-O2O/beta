/* ==============================
   BẢO VỆ TRANG
================================ */


if (!userSession) {
    window.location.href = "signIn_signUp.html";
}


/* ==============================
   DOM
================================ */
const account_display = document.getElementById("loading-acc");
const profile = document.getElementById("profile");
const recAva = document.getElementById("recAva");


/* ==============================
   SET AVATAR
================================ */
window.setAvatar = async function (imgUrl) {
    try {
        const user = firebase.auth().currentUser;
        if (!user) return;

        await db.collection("users")
            .doc(user.uid)
            .set({ avatar: imgUrl }, { merge: true });

        profile.innerHTML = `<img src="${imgUrl}">`;

        document.querySelectorAll(".btnRec").forEach(btn => {
            btn.classList.remove("active");
            if (btn.dataset.url === imgUrl) {
                btn.classList.add("active");
            }
        });

    } catch (err) {
        console.error("Set avatar error:", err);
    }
};



/* ==============================
   LOAD ACCOUNT
================================ */
firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "signIn_signUp.html";
        return;
    }

    try {
        /* ===== USERS ===== */
        const userSnap = await db.collection("users").doc(user.uid).get();
        const userData = userSnap.exists ? userSnap.data() : {};

        /* ===== GAME DATA ===== */
        const gameSnap = await db.collection("gameData").doc(user.uid).get();
        const gameData = gameSnap.exists ? gameSnap.data() : {};

        /* ===== ACCOUNT INFO ===== */
        account_display.innerHTML = `
            <p><b>UID:</b> ${user.uid}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Created:</b> ${user.metadata.creationTime}</p>
            <p><b>Score:</b> ${Number(gameData.scoreValue || 0).toFixed(1)}</p>
            <p><b>Clicks:</b> ${gameData.totalClicks || 0}</p>
            <p><b>Click Power:</b> ${gameData.clickPower || 1}</p>
            <p><b>Click Multiple:</b> ${gameData.clickMultiple || 1}</p>
        `;

        /* ===== AVATAR ===== */
        profile.innerHTML = `
            <img src="${userData.avatar}">
        `;

        /* ==============================
           LOAD AVATAR PRODUCTS
        ================================ */

        const productSnap = await db.collection("products").get();

        const productSnap_2 = db
            .collection("avatar")
            .get()

        console.log("products:", productSnap.size);
        console.log("avatars:", productSnap_2.size);

        let html = "";

        productSnap.forEach(doc => {
            const data = doc.data();
            if (!data.productImg) return;

            html += `
                <button 
                    class="btnRec"
                    onclick="setAvatar('${data.productImg}')"
                    style="background-image: url('${data.productImg}')">
                </button>
            `;
        });


        
        recAva.innerHTML = html;

    } catch (err) {
        console.error("Load account error:", err);
    }

    

});









const UPLOAD_PRESET = "uvrtnlwk"; 
const PROJECT_NAME = "dfz5ailva"
const URL_CLOUDINARY = `https://api.cloudinary.com/v1_1/${PROJECT_NAME}/image/upload`;

/* ==============================
   PHOTO FORM (FIX)
================================ */
const photoForm = document.getElementById("photo_upload");
const imageInput = document.getElementById("image_uploading");
const uploadPreview = document.getElementById("uploadPreview");

let selectedFile = null;

/* ==============================
   CLICK PREVIEW → OPEN FILE
================================ */
uploadPreview.addEventListener("click", () => {
    imageInput.click();
});

/* ==============================
   PREVIEW IMAGE
================================ */
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
        uploadPreview.style.backgroundImage = `url('${reader.result}')`;
        uploadPreview.classList.add("has-image");
        uploadPreview.innerHTML = "";
    };
    reader.readAsDataURL(file);
});

/* ==============================
   UPLOAD & SET AVATAR
================================ */
photoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!selectedFile) {
        alert("Please choose an image first!");
        return;
    }

    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(URL_CLOUDINARY, {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        // LƯU AVATAR (GIỮ ĐÚNG LOGIC CỦA BẠN)
        await db.collection("avatar").add({
            uid: user.uid,
            imgUrl: data.secure_url,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // SET AVATAR
        await setAvatar(data.secure_url);

        // RESET FORM
        photoForm.reset();
        uploadPreview.style.backgroundImage = "";
        uploadPreview.innerHTML = "<label>📸</label>";
        uploadPreview.classList.remove("has-image");
        selectedFile = null;

    } catch (err) {
        console.error("Upload avatar error:", err);
    }

    firebase.auth().onAuthStateChanged()
});

/* ==============================
   RESET BUTTON
================================ */
photoForm.addEventListener("reset", () => {
    uploadPreview.style.backgroundImage = "";
    uploadPreview.innerHTML = "<label>📸</label>";
    uploadPreview.classList.remove("has-image");
    selectedFile = null;
});
