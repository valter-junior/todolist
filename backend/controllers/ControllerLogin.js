const auth = require('../auth/auth').login;

const loginUser = async (req, res, next) => {
  try {
     const data = await auth(req.body)
     res.status(200).json({
         status: true,
         message: "Account login successful",
         data
     })
 } catch (error) {
     next()
 }
}

module.exports = {
    loginUser,
}