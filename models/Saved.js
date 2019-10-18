var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SavedSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    comments: String,
});

var Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;