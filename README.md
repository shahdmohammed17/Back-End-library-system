# Library Management System

A Node.js backend API for managing a library system, including user authentication, book inventory, and transaction tracking.

## Features

- User registration and login with JWT authentication
- Book management (add, update, delete, view all books)
- Transaction management (borrow and return books)
- Secure API endpoints with authentication middleware
- MongoDB database integration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Joi
- **Security**: bcrypt for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd taskday6-library-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb+srv://your-username:your-password@cluster0.0ut8ghm.mongodb.net/library
   JWT_SECRET=your-secret-key
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

The server will run on `http://localhost:3000` with auto-reload enabled.

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires authentication)

### Books
- `POST /api/books/add` - Add a new book (requires authentication)
- `GET /api/books/all` - Get all books (requires authentication)
- `PUT /api/books/update/:id` - Update a book by ID (requires authentication)
- `DELETE /api/books/delete/:id` - Delete a book by ID (requires authentication)

### Transactions
- `POST /api/transactions/borrow` - Borrow a book (requires authentication)
- `PUT /api/transactions/return/:id` - Return a book by transaction ID (requires authentication)
- `GET /api/transactions/user` - Get user's transactions (requires authentication)

## Usage Examples

### Register a User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Add a Book (include JWT token in Authorization header)
```bash
curl -X POST http://localhost:3000/api/books/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "Book Title", "author": "Author Name", "isbn": "1234567890"}'
```

## Project Structure

```
src/
├── database/
│   ├── connection.js
│   └── model/
│       ├── book.model.js
│       ├── transaction.model.js
│       └── user.model.js
├── middleware/
│   └── auth.middleware.js
├── module/
│   ├── books/
│   │   ├── book.controller.js
│   │   └── book.service.js
│   ├── transactions/
│   │   ├── transaction.controller.js
│   │   └── transaction.service.js
│   └── users/
│       ├── user.controller.js
│       └── user.service.js
├── utils/
│   └── jwt.js
└── validation/
    ├── book.validation.js
    ├── transaction.validation.js
    └── user.validation.js
```

## Scripts

- `npm run start:dev` - Start the development server with auto-reload

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC"# Back-End-library-system" 
