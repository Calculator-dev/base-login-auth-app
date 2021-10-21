const { User } = require("../Models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;
    let exsitingName;
    try {
        //Query metode
        exsitingName = await User.findOne({ name: name })
    } catch (error) {
        res.status(500).json({ message: "Couldnt connect to data base" })
        const err = new Error("Couldnt connect to data base", 500)
        return next(err)
    }

    if (exsitingName) {
        res.status(400).json({ message: "User with that name already exist" })
        const err = new Error("User with that name already exist", 400)
        return next(err)
    }

    let exsitingEmail;
    const emailRegex = /\S+@\S+\.\S+/
    try {
        //Query metode
        exsitingEmail = await User.findOne({ email: email })
    } catch (error) {
        res.status(500).json({ message: "Couldn't connect to data base" })
        const err = new Error("Couldn't connect to data base", 500)
        return next(err)
    }

    if (exsitingEmail) {
        res.status(400).json({ message: "User with that email already exist" })
        const err = new Error("User with that email already exist", 400)
        return next(err)
    }

    if (emailRegex.test(email)) {

    } else {
        res.status(400).json({ message: "You have entered invalid email" })
        const err = new Error("You have entered invalid email", 400)
        return next(err)
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        res.status(400).json({ message: "Couldn't  hash password, pleaser try again" })
        const err = new Error("Couldn't hash password, please try again", 500)
        return next(err)
    }

    if (password !== passwordConfirm) {
        res.status(403).json({ message: "Password doesn't match" })
        const error = new Error("Password doesn't match", 403)
        return next(error)
    }

    if (password.length < 6) {
        res.status(403).json({ message: "Password has less than 6 characters" })
        const error = new Error("Password has less than 6 caracters", 403)
        return next(error)
    }

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
    })

    try {
        await newUser.save();
    } catch (error) {
        res.status(400).json({ message: "Couldn't create user" })
        const err = new Error("Couldn't create user", 400)
        return next(err)
    }

    res.status(201).json({ user: newUser })

}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    let exsitingUser;
    try {
        //Query metode
        // Ako nadje userra sve od njega spremi u varijablu existingUsera(name, password, email itd.)
        exsitingUser = await User.findOne({ email: email })
    } catch (error) {
        res.status(500).json({ message: "Couldn't connect to data base" })
        const err = new Error("Couldn't connect to data base", 500)
        return next(err)
    }

    if (!exsitingUser) {
        res.status(400).json({ message: "User with that email dont exist. Please signup" })
        const err = new Error("User with that email dont exist. Please signup", 400)
        return next(err)
    }

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, exsitingUser.password);
    } catch (error) {
        res.status(500).json({ message: "Couldn't log you in, please check your password and try again" })
        const err = new Error("Couldn't log you in, please check your password and try again", 500);
        return next(err)
    }

    if (!isValidPassword) {
        res.status(403).json({ message: "Invalid password, couldn't not log you in" })
        const error = new Error("Invalid password, couldn't log you in", 403)
        return next(error)
    }

    // const token = jwt.sign({ userId: exsitingUser.id }, "paragon")
    // var expiryDate = new Date(Date.now() + (10000));
    // console.log(expiryDate);
    // res.sessionStorage("SavedToken", token, {
    //     expires: expiryDate
    // })

    // return res.status(200).json({ token: token })


    let token;
    try {
        token = jwt.sign(
            {
                userId: exsitingUser.id
            },
            "paragon",
            { expiresIn: "1200000ms", }
        );
    } catch (error) {
        const err = new Error("Logging in failed, please try again later.", 500);
        return next(err)
    }

    res.status(200).json({ token: token })

}

exports.getProfileInformation = async (req, res, next) => {
    const id = req.userData.userId;

    let user;
    try {
        user = await User.findById(id)
    } catch (err) {
        res.status(500).json({ message: "Couldnt connect to database" })
        const error = new Error("Couldnt connect to database");
        return next(error)
    }



    res.status(200).json({ name: user.name, email: user.email })
}