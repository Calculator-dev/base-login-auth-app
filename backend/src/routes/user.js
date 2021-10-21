const express = require("express");
const { signup, signin, getProfileInformation } = require("../controllers/user");
const auth = require("../middleware/auth")
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/getProfileInformation", auth, getProfileInformation)

module.exports = router;