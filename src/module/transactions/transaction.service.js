import Transaction from "../../database/model/transaction.model.js"
import Book from "../../database/model/book.model.js"
import { borrowValidation } from "../../database/validation/transaction.validation.js"


export const borrowBook = async (req,res)=>{
    try{
        const {error} = borrowValidation.validate(req.body)
        if(error) return res.status(400).json({message:error.details[0].message})

        const {userId,bookId} = req.body

        const book = await Book.findById(bookId)
        if(!book) return res.status(404).json({message:"Book not found"})
        if(book.availableCopies<1) return res.status(400).json({message:"No available copies"})

        const transaction = await Transaction.create({
            userId,
            bookId,
            status:"borrowed"
        })

        book.availableCopies -= 1
        await book.save()

        res.json({message:"Book borrowed",transaction})
    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}

export const returnBook = async (req,res)=>{
    try{
        const {id} = req.params
        const transaction = await Transaction.findById(id)
        if(!transaction) return res.status(404).json({message:"Transaction not found"})

        if(req.user.id !== transaction.userId.toString() && req.user.role!=="admin"){
            return res.status(403).json({message:"Not authorized"})
        }

        if(transaction.status==="returned"){
            return res.status(400).json({message:"Book already returned"})
        }

        transaction.status = "returned"
        transaction.returnDate = new Date()
        await transaction.save()

        const book = await Book.findById(transaction.bookId)
        book.availableCopies +=1
        await book.save()

        res.json({message:"Book returned",transaction})
    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}

export const getUserTransactions = async (req,res)=>{
    try{
        const userId = req.user.id
        const transactions = await Transaction.find({userId})
            .populate("bookId","title author publishedYear")
        res.json({transactions})
    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}