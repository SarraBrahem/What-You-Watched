const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: String,
    question: String,
    options: [String],
    tags: [String]
});

module.exports = mongoose.model('Question', questionSchema);