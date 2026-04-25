function getNotices() {
    return JSON.parse(localStorage.getItem("notices")) || [];
}

function saveNotices(notices) {
    localStorage.setItem("notices", JSON.stringify(notices));
}

function loadNotices() {
    displayNotices(getNotices());
    updateCounter();
}

function addNotice() {
    let input = document.getElementById("noticeInput");
    let text = input.value.trim();

    if (!text) return;

    let notices = getNotices();

    let notice = {
        text,
        time: new Date().toLocaleString(),
        priority: confirm("Important notice?") ? "high" : "normal"
    };

    notices.unshift(notice);
    saveNotices(notices);

    input.value = "";
    showToast("Notice Added ✅");
    loadNotices();
}

function displayNotices(notices) {
    let list = document.getElementById("noticeList");
    list.innerHTML = "";

    notices.sort((a, b) => (b.priority === "high") - (a.priority === "high"));

    notices.forEach((n, i) => {
        let li = document.createElement("li");

        li.innerHTML = `
        <div class="notice-card ${n.priority}">
            <div>
                <span class="badge ${n.priority}">
                    ${n.priority === "high" ? "🔥 IMPORTANT" : "📝 NORMAL"}
                </span>
                <small> | ${n.time}</small>
            </div>

            <p>${n.text}</p>

            <div class="actions">
                <button onclick="editNotice(${i})">✏️</button>
                <button onclick="deleteNotice(${i})">❌</button>
            </div>
        </div>
        `;

        list.appendChild(li);
    });
}

function deleteNotice(index) {
    let notices = getNotices();
    notices.splice(index, 1);
    saveNotices(notices);
    showToast("Deleted ❌");
    loadNotices();
}

function editNotice(index) {
    let notices = getNotices();
    let newText = prompt("Edit notice:", notices[index].text);

    if (newText) {
        notices[index].text = newText;
        saveNotices(notices);
        showToast("Updated ✏️");
        loadNotices();
    }
}

function searchNotice() {
    let value = document.getElementById("searchInput").value.toLowerCase();
    let notices = getNotices();

    let filtered = notices.filter(n =>
        n.text.toLowerCase().includes(value)
    );

    displayNotices(filtered);
}

function clearAll() {
    if (confirm("Clear all notices?")) {
        localStorage.removeItem("notices");
        loadNotices();
        showToast("Cleared 🧹");
    }
}

function updateCounter() {
    document.getElementById("counter").innerText =
        "Total Notices: " + getNotices().length;
}

function showToast(msg) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
}

window.onload = loadNotices;