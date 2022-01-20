const jwt = require("jsonwebtoken");
require("dotenv").config

module.exports = async(req, res, next) => {
    try {
        const jwToken = req.header("token");

        if(!jwToken)
        {
            return res.status(403).json("Not Authorized");
        }
        
        //check valid token
        const paylod = jwt.verify(jwToken, process.env.jwtSecret);

        req.user = paylod.user;

    } catch (error) {
        console.error(error.message);
        return res.status(403).json("Not Authorized");
    }
};

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// //this middleware will on continue on if the token is inside the local storage

// module.exports = function(req, res, next) {
//   // Get token from header
//   const token = req.header("jwt_token");

//   // Check if not token
//   if (!token) {
//     return res.status(403).json({ msg: "authorization denied" });
//   }

//   // Verify token
//   try {
//     //it is going to give use the user id (user:{id: user.id})
//     const verify = jwt.verify(token, process.env.jwtSecret);

//     req.user = verify.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };