const express = require("express")
require("dotenv").config()

const app = express()


const cors = require("cors")
const { connection } = require("./Config/db")
const { movieRouter } = require("./Routes/movieRoute")
const { userRouter } = require("./Routes/userRoute")


app.use(cors())

app.use(express.json())
app.use("/movies", movieRouter)
app.use("/users", userRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`Server is running on port ${process.env.PORT}`);
        console.log("Connected to Database");
    } catch (error) {
        console.log(error.message);
        console.log("Something Went Wrong....!");
    }
})