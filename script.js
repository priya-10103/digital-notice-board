function addNotice() {
    let input = document.getElementById("noticeInput");
    let text = input.value;

    if(text === "") return;

    let li = document.createElement("li");
    li.innerHTML = text + ' <button class="delete-btn" onclick="removeNotice(this)">X</button>';

    document.getElementById("noticeList").appendChild(li);
    input.value = "";
}

function removeNotice(btn) {
    btn.parentElement.remove();
}