const { verify } = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try{

        const tokenFromHeader = req.get("loginToken")
        const auth_user = verify(tokenFromHeader, "loginToken")

        if(auth_user){
            req.auth_user = auth_user
            next()
        }else{
            return res.json("User not authenticated")
        }

    }catch{
        res.status(401)
        .json({
            error: "Unauthorized User"
        })
    }
}