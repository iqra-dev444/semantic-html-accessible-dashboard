
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

    try {
        loadingMessage.textContent = "Loading users...";

        await fetchUsers();

        function displayUsers(users) {
            usersList.replaceChildren();

            users.forEach((user) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${user.name} — ${user.email}`;
                usersList.appendChild(listItem);
            });
        }

        displayUsers(demoUsers);
        loadingMessage.textContent = "";

        searchInput.addEventListener("input", () => {
            const searchText = searchInput.value.toLowerCase();

            const filteredUsers = demoUsers.filter((user) =>
                user.name.toLowerCase().includes(searchText) ||
                user.email.toLowerCase().includes(searchText)
            );

            displayUsers(filteredUsers);
        });
    } catch (error) {
        loadingMessage.textContent =
            "Unable to load users. Please try again.";

        console.error("Something went wrong:", error);
    }
}

startApp();
