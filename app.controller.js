import userRoutes from "./src/module/users/user.controller.js"
import bookRoutes from "./src/module/books/book.controller.js"
import transactionRoutes from "./src/module/transactions/transaction.controller.js"


export const bootstrap = (app)=>{

    app.use("/api/users",userRoutes)
    app.use("/api/books",bookRoutes)
    app.use("/api/transactions",transactionRoutes)
}