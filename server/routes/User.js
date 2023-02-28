const express = require("express")
const router = express.Router()
const { User } = require("../models")
const { sign } = require("jsonwebtoken")
const auth = require('../middleware/AuthMiddleware')

router.post("/", async (req, res) => {
    const userInfo = req.body
    const userById = await User.findOne({
        where: {
            googleId: userInfo.googleId,     
        }
    })

    const userByEmail = await User.findOne({
        where: {
            email: userInfo.email,     
        }
    })

    if(!userByEmail && !userById){
        await User.create(userInfo)
        res.json("User Created")
    }else{
        res.json({error: "Already Registered"})
    }
})

router.get("/", async (req, res) => {
    const listOfUsers = await User.findAll()
    res.json(listOfUsers)
})

router.get("/login/:googleId", async (req, res) => {
    const user = await User.findByPk(req.params.googleId)

    if(user){
        const data = {
            user: user,
            login_status: true
        }
        const loginToken = sign(data, "loginToken")

        res.json(loginToken)
    }else{
        res.json({error : "User not found"})
    }
   
})

router.get("/verify", auth, async (req, res) => {
   res.json(req.auth_user)
})



module.exports = router;