function loadNotices() {
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    displayNotices(notices);
}

function displayNotices(notices) {
    let list = document.getElementById("noticeList");
    list.innerHTML = "";

    notices.forEach((notice, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <b style="color:${notice.priority === 'high' ? 'red' : 'black'}">
                ${notice.text}
            </b><br>
            <small>${notice.time}</small>
            <br>
            <button onclick="editNotice(${index})">✏️</button>
            <button onclick="deleteNotice(${index})">❌</button>
        `;

        list.appendChild(li);
    });
}

function addNotice() {
    let input = document.getElementById("noticeInput");
    let text = input.value;

    if (text === "") return;

    let notices = JSON.parse(localStorage.getItem("notices")) || [];

    let now = new Date();
    let time = now.toLocaleString();

    let priority = confirm("Is this important notice?") ? "high" : "normal";

    notices.push({ text, time, priority });

    localStorage.setItem("notices", JSON.stringify(notices));

    input.value = "";
    loadNotices();
}

function deleteNotice(index) {
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.splice(index, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    loadNotices();
}

function editNotice(index) {
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    let newText = prompt("Edit your notice:", notices[index].text);

    if (newText) {
        notices[index].text = newText;
        localStorage.setItem("notices", JSON.stringify(notices));
        loadNotices();
    }
}

function searchNotice() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let notices = JSON.parse(localStorage.getItem("notices")) || [];

    let filtered = notices.filter(n =>
        n.text.toLowerCase().includes(search)
    );

    displayNotices(filtered);
}

window.onload = loadNotices;