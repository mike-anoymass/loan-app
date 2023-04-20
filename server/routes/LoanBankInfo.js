const express = require("express")
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { LoanBankInfo, LoanBasic } = require("../models")

router.post("/", auth, async (req, res) => {
    const data = req.body
    const user = req.auth_user.user

    //try to check if the loan exist
    const exist = await LoanBankInfo.findOne({where: {loanId: data.loanId}})
    const loanInfo = await LoanBasic.findByPk(data.loanId)

    if(!exist){
        //if loan does no exist- create a new loan and return the generated record
        await LoanBankInfo.create(data).then(result => {
            sendEmailToAdmin(user, loanInfo)
            sendEmailToApplicant(user, loanInfo)
            res.json(result)
        })


    }else{
        //if loan exist .. then update it and return the loanID
        await LoanBankInfo.update({
            bankName: data.bankName,
            accountName: data.accountName,
            accountNumber: data.accountNumber,
        }, {
            where: {
                loanId: "40"
            }
        })

        res.json(data)
    }

})

router.get("/:id", auth, async (req, res) => {
    //get loan id from the query parameter
    const loanID = req.params.id

    if(loanID != 0){
        //if loan exit then send back loan details
        const data = await LoanBankInfo.findOne({
            where: {
                loanId: loanID
            }, 
            attributes:{
                exclude: [
                    "createdAt", "updatedAt", "id", "loanId" 
                ]
            }
        })

        if(data){
            res.json(data)
        }else{
            res.json({error: "Bank Loan information not found"})
        }
        
    }else{
        res.json({error: "Invalid Loan ID"})
    }

})

const sendEmailToAdmin = (user_info, loanInfo) => {
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
        to: process.env.ADMIN_EMAIL,
        subject: 'NEW LOAN APPLICATION ALERT',
        html: `<h3>Loan Application Details</h3> <p>Applicant: ${user_info.name} <br>Loan ID: ${loanInfo.id} <br>LoanFor: ${loanInfo.loanFor} <br>Amount: MK${loanInfo.amount} <br>Percentage: ${loanInfo.termId} <br>Payback Value: ${loanInfo.paybackAmount} </p> <p><i>Go to ...</i></>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
} 

const sendEmailToApplicant = (user_info, loanInfo) => {
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
        to: user_info.email,
        subject: 'NEW LOAN APPLICATION ALERT',
        html: `<h3>Hello ${user_info.name},</h3><p>Your loan Application (LOAN ID: ${loanInfo.id}) has been Submitted for review. We will contact you in less than an hour once we are done with the review <br> You can check your application status on this link ... <br><br> <i>Thank you for choosing QuickLoans</i> </p>`
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