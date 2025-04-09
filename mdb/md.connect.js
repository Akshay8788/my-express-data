const mongoose = require("mongoose")


require("dotenv").config()
const url = process.env.MONGODB

const intializeDatabase = async()=>{
    try{
        await mongoose.connect(url).then(console.log("Connected to Database"))
    }
    catch{
        console.log("error while connecting to database.")
    }

}
module.exports = {intializeDatabase}