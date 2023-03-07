const express = require("express")
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { LoanBasic} = require("../models")

router.post("/", auth, async (req, res) => {
    const { amount, term, reason, loanId, paybackAmount } = req.body
    const authUser = req.auth_user.user

    //try to check if the loan exist
    const exist = await LoanBasic.findByPk(loanId)

    if(!exist){
        //if loan does no exist- create a new loan and return the generated record
        await LoanBasic.create({
            amount: amount,
            termId: term,
            loanFor: reason,
            paybackAmount: paybackAmount,
            userId: authUser.googleId
        }).then(result => {
            res.json(result)
        })
    }else{
        //if loan exist .. then update it and return the loanID
        await LoanBasic.update({
            amount: amount,
            termId: term,
            loanFor: reason,
            paybackAmount: paybackAmount,
        }, {
            where: {
                id: loanId
            }
        })
        res.json({id: loanId})
    }

})

router.get("/:id", auth, async (req, res) => {
    //get loan id from the query parameter
    const loanID = req.params.id

    if(loanID != 0){
        //if loan exit then send back loan details
        const data = await LoanBasic.findByPk(loanID)

        if(data){
            res.json({
                amount: data.amount,
                term: data.termId,
                reason: data.loanFor,
                paybackAmount: data.paybackAmount
            })
        }else{
            res.json({error: "Basic Loan information not found"})
        }
        
    }else{
        res.json({error: "Invalid Loan ID"})
    }

})


module.exports = router