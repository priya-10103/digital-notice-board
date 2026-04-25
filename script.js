let isDark = false;
let isAdmin = false;
let fullscreen = false;

function getData() {
    return JSON.parse(localStorage.getItem("notices")) || [];
}

function saveData(data) {
    localStorage.setItem("notices", JSON.stringify(data));
}

function loadNotices() {
    display(getData());
    updateCount();
}

function addNotice() {
    if (!isAdmin) return alert("Admin only!");

    let text = document.getElementById("noticeInput").value;
    if (!text) return;

    let data = getData();

    data.unshift({
        text,
        time: new Date().toLocaleString(),
        priority: confirm("Important?") ? "high" : "normal",
        pinned: false
    });

    saveData(data);
    document.getElementById("noticeInput").value = "";

    toast("Added ✅");
    loadNotices();
}

function display(data) {
    let list = document.getElementById("noticeList");
    list.innerHTML = "";

    data.sort((a,b)=> (b.pinned) - (a.pinned));

    data.forEach((n,i)=>{

        let div = document.createElement("div");
        div.className = "notice " + n.priority;

        div.innerHTML = `
            <div>
                <b>${n.text}</b>
                <div class="badge">${n.time}</div>
            </div>

            <button onclick="pin(${i})">📌</button>
            <button onclick="edit(${i})">✏️</button>
            <button onclick="del(${i})">❌</button>
        `;

        list.appendChild(div);
    });
}

function del(i){
    if (!isAdmin) return;

    let data = getData();
    data.splice(i,1);
    saveData(data);
    loadNotices();
}

function edit(i){
    if (!isAdmin) return;

    let data = getData();
    let t = prompt("Edit:", data[i].text);

    if(t){
        data[i].text = t;
        saveData(data);
        loadNotices();
    }
}

function pin(i){
    let data = getData();
    data[i].pinned = !data[i].pinned;
    saveData(data);
    loadNotices();
}

function searchNotice(){
    let v = document.getElementById("searchInput").value.toLowerCase();
    let data = getData().filter(n=> n.text.toLowerCase().includes(v));
    display(data);
}

function clearAll(){
    if(!isAdmin) return;
    localStorage.removeItem("notices");
    loadNotices();
}

function updateCount(){
    document.getElementById("counter").innerText =
        "Total Notices: " + getData().length;
}

function toast(msg){
    let t = document.createElement("div");
    t.className = "toast";
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),2000);
}

/* DARK MODE */
function toggleDark(){
    document.body.classList.toggle("dark");
}

/* ADMIN LOGIN */
function toggleAdmin(){
    document.getElementById("adminPanel").classList.toggle("hidden");
}

function unlockAdmin(){
    let pass = document.getElementById("adminPass").value;
    if(pass === "1234"){
        isAdmin = true;
        toast("Admin Unlocked 🔓");
    } else {
        alert("Wrong password");
    }
}

/* FULLSCREEN TV MODE */
function toggleFullscreen(){
    document.body.classList.toggle("fullscreen");
}

/* INIT */
window.onload = loadNotices;