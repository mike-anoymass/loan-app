const express = require("express")
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { ContactInfo } = require("../models")

router.post("/", auth, async (req, res) => {
    const data = req.body
    const authUser = req.auth_user.user

    const exist = await ContactInfo.findOne({
        where: {
            userId: authUser.googleId
        }
    })

    if(!exist){
        data.userId = authUser.googleId
        await ContactInfo.create(data)
        res.json("Contact Info Saved")
    }else{
        res.json({error: "Contact Info Exist"})
    }

})

router.get("/:id", auth, async (req, res) => {
    const googleId = req.params.id
    const authUser = req.auth_user.user

    if(googleId === authUser.googleId){
        const data = await ContactInfo.findOne({
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