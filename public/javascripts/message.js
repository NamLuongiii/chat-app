// io() mặc định sẽ kết nối tới host của website
var socket = io()

// Khi khởi tạo kết nối thành công thì in ra định danh của nó
socket.on("connect", () => {
    console.log(socket.id)
})

// Lắng nghe sự kiện tên là message bắn ra từ server
socket.on("message", addMessages)

$(() => {
    $("#send").click(() => {
        sendMessage({
            name: $("#name").val(),
            message: $("#message").val(),
        })
    })
    getMessages()
})

function addMessages(message) {
    $("#messages").append(`
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>`)
}

function getMessages() {
    $.get("http://localhost:3000/messages", (data) => {
        data.forEach(addMessages)
    })
}

function sendMessage(message) {
    $.post("http://localhost:3000/messages", message)
}
