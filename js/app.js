
const demoUsers = [
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Aman Verma", email: "aman.verma@example.com" },
    { name: "Neha Gupta", email: "neha.gupta@example.com" },
    { name: "Arjun Kumar", email: "arjun.kumar@example.com" },
    { name: "Pooja Mishra", email: "pooja.mishra@example.com" },
    { name: "Ravi Yadav", email: "ravi.yadav@example.com" },
    { name: "Anjali Patel", email: "anjali.patel@example.com" },
    { name: "Rohit Singh", email: "rohit.singh@example.com" },
    { name: "Sneha Verma", email: "sneha.verma@example.com" }
];

async function startApp() {
    const usersList = document.getElementById("users-list");
    const loadingMessage = document.getElementById("loading-message");
    const searchInput = document.getElementById("user-search");
    const sortSelect = document.getElementById("user-sort");

    if (!usersList || !loadingMessage || !searchInput || !sortSelect) {
        console.error("A required HTML element is missing.");
        return;
    }

    function displayUsers() {
        const searchText = searchInput.value.trim().toLowerCase();
        let filteredUsers = demoUsers.filter((user) =>
            user.name.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText)
        );

        if (sortSelect.value === "az") {
            filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortSelect.value === "za") {
            filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
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

    try {
        loadingMessage.textContent = "Loading users...";
        await fetchUsers();

        displayUsers();
        loadingMessage.textContent = "";

        searchInput.addEventListener("input", displayUsers);
        sortSelect.addEventListener("change", displayUsers);
    } catch (error) {
        loadingMessage.textContent =
            "Unable to load users. Please refresh the page.";
        console.error("Something went wrong:", error);
    }
}

startApp();
