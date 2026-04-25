function addNotice() {
    let input = document.getElementById("noticeInput");
    let text = input.value;

    if (text === "") return;

    let li = document.createElement("li");
    li.innerText = text;

    document.getElementById("noticeList").appendChild(li);
    input.value = "";
}