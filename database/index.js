const mongoose = require("mongoose")
const { Order } = require("./order")
const { User } = require("./user") 

const databaseName = "b6"
const URI = `mongodb://localhost:27017/${databaseName}`

mongoose.connect(URI, () => {
    console.log("connect db successfully")
})

module.exports = {
    Order,
    User,
}

/* 
  Viết chức năng:
  - Tạo user trả về userId.
  - Hàm nhận vào userId, thông tin đơn hàng để tạo một đơn mới
  - User nhập tài khoản, mật khẩu. Nếu đúng trả về tất cả đơn hàng của user đó.
  - Hàm đổi tài khoản mật khẩu
  - Hàm thống kê (tổng đơn, thành tiền) dựa vào userId
*/
