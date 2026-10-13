
async function startApp() {
    const usersList = document.getElementById("users-list");
    const loadingMessage = document.getElementById("loading-message");
    const searchInput = document.getElementById("user-search");
    const sortSelect = document.getElementById("user-sort");

    if (!usersList || !loadingMessage || !searchInput || !sortSelect) {
        console.error("A required HTML element is missing.");
        return;
    }

    let users = [];

    // Load saved users from localStorage
    try {
        const savedUsers = localStorage.getItem("dashboardUsers");

        if (savedUsers) {
            users = JSON.parse(savedUsers);
        }
    } catch (error) {
        console.error("Could not read saved users:", error);
    }

    function displayUsers() {
        const searchText = searchInput.value.trim().toLowerCase();

        let filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText)
        );

        if (sortSelect.value === "az") {
            filteredUsers.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        } else if (sortSelect.value === "za") {
            filteredUsers.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        }

        usersList.replaceChildren();

        if (filteredUsers.length === 0) {
            const item = document.createElement("li");
            item.textContent = "No users found.";
            usersList.appendChild(item);
            return;
        }

        filteredUsers.forEach((user) => {
            const item = document.createElement("li");
            item.textContent = `${user.name} — ${user.email}`;
            usersList.appendChild(item);
        });
    }

    searchInput.addEventListener("input", displayUsers);
    sortSelect.addEventListener("change", displayUsers);

    // Show saved data immediately, if available
    if (users.length > 0) {
        displayUsers();
    }

    try {
        loadingMessage.textContent = "Loading users...";

        const apiUsers = await fetchUsers();

        users = apiUsers.map((user) => ({
            name: user.name,
            email: user.email
        }));

        // Save API users
        try {
            localStorage.setItem(
                "dashboardUsers",
                JSON.stringify(users)
            );
        } catch (error) {
            console.error("Could not save users:", error);
        }

        displayUsers();
        loadingMessage.textContent = "";

    } catch (error) {
        console.error("Failed to load users:", error);

        if (users.length > 0) {
            displayUsers();
            loadingMessage.textContent =
                "Unable to refresh users. Showing saved data.";
        } else {
            loadingMessage.textContent =
                "Unable to load users. Please check your connection and refresh.";
        }
    }
}

startApp();
