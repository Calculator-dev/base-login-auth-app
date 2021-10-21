const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const userRoutes = require("./routes/user")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());
app.use("/users", userRoutes);


//povezivanje na server
mongoose.connect("mongodb+srv://Vjezba:fH89j6U2cM7T9KU8@baselogin.25mbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => app.listen(5000), console.log("Server is listening on port: 5000"))
    .catch((err) => console.log(err))