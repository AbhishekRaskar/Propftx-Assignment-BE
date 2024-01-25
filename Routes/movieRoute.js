const express = require("express");
const { movieModel } = require("../Models/movieModel");
const { auth } = require("../Middleware/authMiddleware");

const movieRouter = express.Router();

movieRouter.use(auth);

// To Add new movie
movieRouter.post("/add", async (req, res) => {
    try {
        const movie = new movieModel(req.body);
        await movie.save();
        res.json({ msg: "New Movie Has been added", movie: req.body });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// To Get List of Movies
movieRouter.get("/", async (req, res) => {
    try {
        const movies = await movieModel.find();
        res.json({ msg: "Movie List", movies });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// To get Single Movie
movieRouter.get("/:movieID", async (req, res) => {
    const { movieID } = req.params;

    try {
        const movie = await movieModel.findById(movieID);

        if (movie) {
            res.json({ msg: "Movie details", movie });
        } else {
            res.status(404).json({ msg: "Movie not found" });
        }
    } catch (error) {
        console.error("Error getting movie:", error);
        res.status(500).json({ error: error.message });
    }
});

// To Update Movie
movieRouter.patch("/update/:movieID", async (req, res) => {
    const { movieID } = req.params;

    try {
        const movie = await movieModel.findByIdAndUpdate({ _id: movieID }, req.body);

        if (movie) {
            res.json({ msg: `${movie.name} has been updated`, movie });
        } else {
            res.status(404).json({ msg: "Movie not found" });
        }
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ error: error.message });
    }
});

// To Delete Movie
movieRouter.delete("/delete/:movieID", async (req, res) => {
    const { movieID } = req.params;

    try {
        const movie = await movieModel.findByIdAndDelete(movieID);

        if (movie) {
            res.json({ msg: `${movie.name} has been deleted`, movie });
        } else {
            res.status(404).json({ msg: "Movie not found" });
        }
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    movieRouter
};
