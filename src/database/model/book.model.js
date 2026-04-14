import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    author:{
        type:String,
        required:true
    },

    publishedYear:{
        type:Number,
        required:true
    },

    availableCopies:{
        type:Number,
        default:1,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Book = mongoose.model("Book", bookSchema)

export default Book