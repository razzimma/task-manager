const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

app.use(express.json())
app.use(cors())
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/anotherblogroutes")
app.use("/api", blogRoute)
app.use("/api", userRoute)
app.listen(5050, () =>{
    console.log("Server running on port 5050");
})