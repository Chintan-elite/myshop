const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    qty: {
        type: Number,
        default: 1
    },
    total: {
        type: Number
    }

})

module.exports = new mongoose.model("Cart", cartSchema)