import Book from "../../database/model/book.model.js"
import { bookValidation } from "../../database/validation/book.validation.js"

export const addBook = async (req,res)=>{
    try{
        const {error} = bookValidation.validate(req.body)
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }

        const {title,author,publishedYear,availableCopies} = req.body

        const book = await Book.create({title,author,publishedYear,availableCopies})

        res.json({message:"Book added",book})
    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}

export const getBooks = async (req,res)=>{
    try{
        let {sortBy,page,limit} = req.query

        page = parseInt(page)||1
        limit = parseInt(limit)||10

        let sortOption = {}
        if(sortBy==="title") sortOption.title=1
        if(sortBy==="publishedYear") sortOption.publishedYear=1

        const books = await Book.find()
                                .sort(sortOption)
                                .skip((page-1)*limit)
                                .limit(limit)
        res.json({books})
    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}

export const updateBook = async (req,res)=>{
    try{
        const {id} = req.params
        const {error} = bookValidation.validate(req.body)
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }

        const book = await Book.findByIdAndUpdate(id,req.body,{new:true})
        if(!book){
            return res.status(404).json({message:"Book not found"})
        }

        res.json({message:"Book updated",book})
    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}

export const deleteBook = async (req,res)=>{
    try{
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)
        if(!book){
            return res.status(404).json({message:"Book not found"})
        }
        res.json({message:"Book deleted"})
    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}