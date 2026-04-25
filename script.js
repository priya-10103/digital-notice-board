let admin = false;
let tvMode = false;

function get() {
    return JSON.parse(localStorage.getItem("data")) || [];
}

function save(d) {
    localStorage.setItem("data", JSON.stringify(d));
}

function load() {
    render(get());
    document.getElementById("counter").innerText =
        "Total: " + get().length;
}

function add() {
    if (!admin) return alert("Admin only");

    let text = document.getElementById("text").value;
    if (!text) return;

    let data = get();

    data.unshift({
        text,
        time: new Date().toLocaleString(),
        high: confirm("Important?"),
        pin: false
    });

    save(data);
    document.getElementById("text").value = "";

    toast("Added ✅");
    load();
}

function render(data) {
    let box = document.getElementById("list");
    box.innerHTML = "";

    // pinned first
    data.sort((a,b)=> b.pin - a.pin);

    data.forEach((n,i)=>{

        let div = document.createElement("div");
        div.className = "card";

        if(n.high) div.classList.add("high");
        if(n.pin) div.classList.add("pin");

        div.innerHTML = `
            <b>${n.text}</b><br>
            <small>${n.time}</small><br>

            <button onclick="pin(${i})">📌</button>
            <button onclick="del(${i})">❌</button>
        `;

        box.appendChild(div);
    });
}

function del(i){
    if(!admin) return;

    let d = get();
    d.splice(i,1);
    save(d);
    load();
}

function pin(i){
    let d = get();
    d[i].pin = !d[i].pin;
    save(d);
    load();
}

function search(){
    let v = document.getElementById("search").value.toLowerCase();
    let d = get().filter(x => x.text.toLowerCase().includes(v));
    render(d);
}

function clearAll(){
    if(!admin) return;
    localStorage.removeItem("data");
    load();
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
    document.getElementById("adminBox").classList.toggle("hidden");
}

function login(){
    let p = document.getElementById("pass").value;
    if(p === "1234"){
        admin = true;
        toast("Admin ON 🔓");
    } else {
        alert("Wrong password");
    }
}

/* TV MODE */
function toggleTV(){
    tvMode = !tvMode;
    document.body.classList.toggle("tv");
}

/* INIT */
window.onload = load;