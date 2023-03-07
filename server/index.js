const express = require("express")
const models = require("./models")
const cors = require("cors")
const userRouter = require("./routes/User")
const basicInfoRouter = require("./routes/BasicInfo")
const contactInfoRouter = require("./routes/ContactInfo")
const workInfoRouter = require("./routes/WorkInfo")
const attachmentInfoRouter = require("./routes/UserAttachment")
const loanBasicInfoRouter = require("./routes/LoanBasicInfo")

require("dotenv").config()

const server = express()

server.use(express.json())
server.use(cors())

server.use("/auth", userRouter)
server.use("/basicInfo", basicInfoRouter)
server.use("/contactInfo", contactInfoRouter)
server.use("/workInfo", workInfoRouter)
server.use("/attachmentInfo", attachmentInfoRouter)
server.use("/loanBasicInfo", loanBasicInfoRouter)

models.sequelize.sync()
    .then(() => {
        server.listen(process.env.PORT || 3001 , () => console.log("server running on port 3001"))
    })
    .catch(err => {
        console.log(err)
    })