async function startApp() {
    const usersList = document.getElementById("users-list");
    const loadingMessage = document.getElementById("loading-message");

    try {
        const users = await fetchUsers();

        loadingMessage.textContent = "";

        users.forEach((user) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${user.name} — ${user.email}`;
            usersList.appendChild(listItem);
        });
    } catch (error) {
        loadingMessage.textContent = "Unable to load users. Please try again.";
        console.error("Something went wrong:", error);
    }
}

startApp();
