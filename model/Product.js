
const mongoose = require("mongoose")

const productschema = new mongoose.Schema({

    cid: {
        type: mongoose.Schema.Types.ObjectId
    },
    pname: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
    imgname: {
        type: String
    }

})

module.exports = new mongoose.model("Product", productschema)