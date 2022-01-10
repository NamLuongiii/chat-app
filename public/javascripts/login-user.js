const loginBtn = document.querySelector("#login-btn")
loginBtn.addEventListener("click", login)

async function login(e) {
    try {
        const usernameInput = document.querySelector("#username")
        const username = usernameInput.value

        const passwordInput = document.querySelector("#password")
        const password = passwordInput.value

        if (!username || !password)
            return alert("Username or password is not exsit")

        // Create a request to server, require create a new user
        // method: POST
        // body: { username, passowrd }
        // /request-token
        const res = await axios({
            method: "post",
            url: "/users/request-token",
            data: {
                username: username,
                password: password,
            },
        })

        location.href = '/'
    } catch (error) {
        alert(error.message)
    }
}
