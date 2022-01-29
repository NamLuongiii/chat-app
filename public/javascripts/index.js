const logoutBtn = document.getElementById("logout")

logoutBtn.addEventListener("click", logout)

async function logout(e) {
    try {
        // Yêu cầu server destroy cái token đi
        const res = await axios({
            method: "post",
            url: "/users/logout",
            data: {},
        })

        // Xóa token trong cookie đi
        document.cookie =
            "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"

        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
