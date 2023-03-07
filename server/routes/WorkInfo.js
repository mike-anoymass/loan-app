const express = require('express')
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { WorkInfo } = require("../models")

router.post("/", auth, async (req, res) => {
    const user = req.auth_user.user
    const data = req.body

    const info = await WorkInfo.findOne({
        where: {
            userId: user.googleId
        }
    })

    data.userId = user.googleId

    if(!info){
        await WorkInfo.create(data)
        res.json(data)
    }else{
         await WorkInfo.update({
            incomeSource: data.incomeSource, 
            description: data.description, 
            workplace: data.workplace
            }, { 
                where: {
                    userId: data.userId
                }
            })
        res.json({error: "Work information exist", data: info})
    }
})

router.get("/:id", auth, async (req, res) => {
    const googleId = req.params.id
    const authUser = req.auth_user.user

    if(googleId === authUser.googleId){
        const data = await WorkInfo.findOne({
            where: {
                userId: authUser.googleId
            }
        })

        if(data){
            res.json(data)
        }else{
            res.json({error: "Contact information not found"})
        }
        
    }else{
        res.json({error: "Wrong User"})
    }

})

module.exports = router