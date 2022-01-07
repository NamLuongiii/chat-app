const createBtn = document.querySelector("#create-btn")
createBtn.addEventListener("click", createUser)

async function createUser(e) {
    try {
        const usernameInput = document.querySelector("#username")
        const username = usernameInput.value
    
        const passwordInput = document.querySelector("#password")
        const password = passwordInput.value
    
        // if (!username || !password)
        //     return alert("Username or password is not exsit")
    
        // Create a request to server, require create a new user
        // method: POST
        // body: { username, passowrd }
        // /users
        const res = await axios({
            method: "post",
            url: "/users",
            data: {
                username: username,
                password: password,
            },
        })

        alert("Create success")
        location.href = "/"
    } catch (error) {
        alert(error.message)        
    }
}
