import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },

    borrowDate:{
        type:Date,
        default:Date.now,
        required:true
    },

    returnDate:{
        type:Date,
        default:Date.now,
    },

    status:{
        type:String,
        enum:["borrowed","returned"],
        required:true
    }

})

const Transaction = mongoose.model("Transaction",transactionSchema)

export default Transaction