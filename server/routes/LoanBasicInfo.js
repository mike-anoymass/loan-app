const express = require("express")
const { Op } = require('sequelize');
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { LoanBasic, LoanCollateral, LoanWitness, LoanBankInfo, LoanStatus  } = require("../models")

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


router.delete("/:id", auth, async (req, res) => {
    //get loan id from the query parameter
    const loanID = req.params.id

    if(loanID != 0){
        //if loan exist then send back loan details
        const data = await LoanBasic.findByPk(loanID)

        if(data){
            const resp = await LoanBasic.destroy({
                where : {
                    id: loanID
                }
            })

            res.json(resp)
        }else{
            res.json({error: "Basic Loan information not found"})
        }
        
    }else{
        res.json({error: "Invalid Loan ID"})
    }

})

router.get("/myApplications/:userId", auth, async (req, res) => {
    //get user id from the query parameter
    const userId = req.params.userId
    const authUser = req.auth_user.user

    if(authUser.googleId === userId){

        LoanStatus.findAll({
            attributes: ['loanId']
        }).then( status => {
            const ids = status.map(statuses => {
                return statuses.loanId
            })
            LoanBasic.findAll({
                where: {userId: userId, id: {[Op.notIn]: ids}},
                order: [
                    ['id', 'DESC']
                ]
            }).then( myLoans => {
                if(myLoans.length > 0){
                    res.json(myLoans)
                }else{
                    res.json({error: "You have no pending loan applications"})
                }
            }) 
        })
       
    }else{
        res.json({error: "Wrong User"})
    }

})

router.get("/loan/fullInfo/:id", auth, async (req, res) => {
    const authUser = req.auth_user.user
    const loanID = req.params.id

    const basicInfo = await LoanBasic.findOne({
        where: {
            id: loanID
        }
    })

    const collateralInfo = await LoanCollateral.findOne({
        where: {
            loanId: loanID
        }
    })

    const witnessInfo = await LoanWitness.findOne({
        where: {
            loanId: loanID
        }
    })

    const bankInfo = await LoanBankInfo.findOne({
        where: {
            loanId: loanID
        }
    })

    res.json({basicInfo,collateralInfo, witnessInfo, bankInfo})
    
})


module.exports = router