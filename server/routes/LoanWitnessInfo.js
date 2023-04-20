const express = require("express")
const router = express.Router()
const auth = require("../middleware/AuthMiddleware")
const { LoanWitness } = require("../models")

router.post("/", auth, async (req, res) => {
    const data = req.body

    //try to check if the loan exist
    const exist = await LoanWitness.findOne({where: {loanId: data.loanId}})

    if(!exist){
        //if loan does no exist- create a new loan and return the generated record
        await LoanWitness.create(data).then(result => {
            res.json(result)
        })
    }else{
        //if loan exist .. then update it and return the loanID
        await LoanWitness.update({
            name: data.name,
            residence: data.residence,
            phoneNumber: data.phoneNumber,
        }, {
            where: {
                loanId: data.loanId
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
        const data = await LoanWitness.findOne({
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
            res.json({error: "Witness Loan information not found"})
        }
        
    }else{
        res.json({error: "Invalid Loan ID"})
    }

})


module.exports = router