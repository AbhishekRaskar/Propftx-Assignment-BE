const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
    {
        name: String,
        type: {
            type: String,
            enum: ["Action", "Drama", "Suspense", "Thriller", "Romance"],
        },
        rating: Number,
        release_date: String,
        overview: String,
        duration: Number,
    },
    {
        versionKey: false,
    }
);

const movieModel = mongoose.model("movie", movieSchema);

module.exports = {
    movieModel,
};
