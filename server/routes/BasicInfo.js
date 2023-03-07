const express = require("express")
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { BasicInfo, ContactInfo, WorkInfo, UserAttachment } = require("../models")

router.post("/", auth, async (req, res) => {
    const data = req.body
    const authUser = req.auth_user.user

    const exist = await BasicInfo.findOne({
        where: {
            userId: authUser.googleId
        }
    })

    data.userId = authUser.googleId

    if(!exist){
        await BasicInfo.create(data)
        res.json("Basic Info Saved")
    }else{
        await BasicInfo.update({fullName: data.fullName, gender: data.gender}, {where: {userId: data.userId}})
        res.json({error: "Basic Info Exist"})
    }

})

router.get("/:id", auth, async (req, res) => {
    const googleId = req.params.id
    const authUser = req.auth_user.user

    if(googleId === authUser.googleId){
        const data = await BasicInfo.findOne({
            where: {
                userId: authUser.googleId
            }
        })

        if(data){
            res.json(data)
        }else{
            res.json({error: "Basic information not found"})
        }
        
    }else{
        res.json({error: "Wrong User"})
    }

})

router.get("/checkProfile/profile", auth, async (req, res) => {
    const authUser = req.auth_user.user

    const basicInfo = await BasicInfo.findOne({
        where: {
            userId: authUser.googleId
        }
    })

    const contactInfo = await ContactInfo.findOne({
        where: {
            userId: authUser.googleId
        }
    })

    const workInfo = await WorkInfo.findOne({
        where: {
            userId: authUser.googleId
        }
    })

    const attachmentInfo = await UserAttachment.findOne({
        where: {
            userId: authUser.googleId
        }
    })

    if(contactInfo && basicInfo && workInfo && attachmentInfo){
        res.json({basicInfo, contactInfo, workInfo, attachmentInfo})
    }else{
        res.json(false)
    }
    
})


module.exports = router