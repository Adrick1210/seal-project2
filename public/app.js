// New modal function
function showModal() {
    document.getElementById("addModal").style.display = "block";
}

document.querySelector("button").addEventListener("click", showModal);
document.querySelector("#addModal .close").addEventListener("click", function() {
    document.getElementById("addModal").style.display = "none";
})