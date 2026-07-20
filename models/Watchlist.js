const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    company: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Watchlist", watchlistSchema);