const router = require("express").Router();
const {
  registerUser,
  loginUser,
  allUsers,
  finduser
} = require("../controllers/userControllers");
const auth = require("../middleware/authMiddleware");
router.get('/user/:id', finduser)

router.route("/").post(registerUser).get(auth, allUsers);
router.route("/login").post(loginUser);
module.exports = router;
