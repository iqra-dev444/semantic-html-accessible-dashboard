const dialog = document.getElementById("info-dialog");
const closeButton = dialog?.querySelector("button");

if (dialog && closeButton) {
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}
