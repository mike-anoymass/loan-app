const express = require('express')
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { UserAttachment } = require("../models")
const multer = require('multer')
const upload = multer({ dest: 'images/' })
const fs = require('fs')

router.post("/", auth, upload.single('image'), async (req, res) => {
    const user = req.auth_user.user

    const imageName = req.file.filename
    const description = req.body.description
    
    const info = await UserAttachment.findOne({
        where: {
            userId: user.googleId
        }
    })

    const data = {fileName: description, location: imageName, userId: user.googleId}
    if(!info){
        await UserAttachment.create(data)
        sendEmail(user)
        res.json(data)
    }else{
        fs.unlink(`images/${info.location}`, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("File removed:", `images/${info.location}`);
            }
        });

        await UserAttachment.update({
            fileName: data.fileName, 
            location: data.location, 
        }, {
            where: {
                userId: data.userId
            }
        })
        res.json({error: "Attachment information exist", data: info, newLocation: data.location})
    }
})

router.get("/:id", auth, async (req, res) => {
    const googleId = req.params.id
    const authUser = req.auth_user.user

    if(googleId === authUser.googleId){
        const data = await UserAttachment.findOne({
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

router.get('/images/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is 
  // authorized to view this image, then

  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

const sendEmail = user => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SERVER_EMAIL,
            pass: process.env.EMAIL_SECURITY_KEY
        }
    });

    var mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: user.email,
        subject: 'PROFILE CREATED WITH QuickLoans',
        html: '<h3>Bravo! You have Successfully created a profile with QuickLoans</h3> <p>You are one step ahead... <br> <br>Thank you for creating a profile, now you can be able to apply for loans on our website and access all our services</p> <p><i>Thank you for choosing us</i></>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
} 

module.exports = router