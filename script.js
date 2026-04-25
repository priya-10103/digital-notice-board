function loadNotices() {
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    let list = document.getElementById("noticeList");
    list.innerHTML = "";

    notices.forEach((notice, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${notice.text} <br>
            <small>${notice.time}</small>
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

    notices.push({ text, time });

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

window.onload = loadNotices;