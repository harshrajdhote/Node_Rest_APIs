 const express = require("express")
 const app = express()
 require("./db/mongoose")
 const taskRouter = require("./routes/task")
 const userRouter = require("./routes/user")
 const port = process.env.PORT || 3000
 app.use(express.json())
 app.use(taskRouter)
 app.use(userRouter)
 app.listen(port, () => {
     console.log("Server is up on port " + port)
 })