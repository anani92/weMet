// const { jwt } = require("jsonwebtoken");

// module.exports.checkAuth = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.status(401).json("No token found, Forbidden Access");
//   }
//   jwt.verify(token, process.env.SECRET, (err, userId) => {
//     if (err) {
//       return res.status(403).json("Invalid token");
//     }
//     req.user = {
//       id: userId,
//     };
//     next();
//   });
// };
