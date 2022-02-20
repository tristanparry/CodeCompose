const mongoose = require('mongoose');

// CREATE THE USER SCHEMA MODEL (MONGOOSE SCHEMA)
const userSchema = new mongoose.Schema({ // Schema made to be recognized/used by the MongoDB database (Mongoose interprets MongoDB documents as Objects with this structure)
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    savedProjectsList: {
        type: Array,
        name: {
            type: String,
            required: true
        },
        savedHTML: {
            type: String,
            required: true
        },
        savedCSS: {
            type: String,
            required: true
        },
        savedJS: {
            type: String,
            required: true
        },
        required: true
    }
});

module.exports = mongoose.model("User", userSchema); // Exports the userSchema to be utilized by the server's Routes (../routes/userHandler.js)