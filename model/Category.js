const mongoose = require("mongoose")

const catSchema = new mongoose.Schema({
    catname: {
        type: String
    },

})

module.exports = new mongoose.model("Category", catSchema)