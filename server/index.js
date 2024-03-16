const express = require("express")
const mongoose = require("mongoose")

const app = express()

mongoose.connect("mongodb://localhost:27017/crud") //change the link depend on your local machine
    //database: crud
    //collection: users
    // {
    //     "_id": {
    //       "$oid": "65f4fd31e3352e52e8db4faa"
    //     },
    //     "name": "vuongtung",
    //     "age": 21
    //   }


const UserSchema = mongoose.Schema({
    name: String,
    age: Number
})

const UserModel = mongoose.model("users", UserSchema)

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(function(users) {
        res.json(users)
    }).catch(function(err) {
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log("server is running on port 3001")
})