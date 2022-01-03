const mongoose = require("mongoose")

const Schema = mongoose.Schema
const orderSchema = new Schema({
    productName: String,
    status: String,
    price: Number,
    // Reference
    user: { type: mongoose.Types.ObjectId, ref: "user" },
})

const Order = mongoose.model("order", orderSchema)

module.exports = { Order }
