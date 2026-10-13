
async function startApp() {
    try {
        const users = await fetchUsers();

        console.log(users);
    } catch (error) {
        console.error("Something went wrong:", error);
    }
}

startApp();

