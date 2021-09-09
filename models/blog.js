const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema--> creating a structure
const blogSchema = new mongoose.Schema({
    ImageName:String,
    ImageUrl:String,
    ImageDetails:String

});

module.exports = mongoose.model("Blog",blogSchema)