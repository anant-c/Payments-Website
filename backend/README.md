# 💼 PayTm Backend

This directory contains the entire **server-side application** for the Pay-App, built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, profile management, and financial transactions.

---

## 🚀 Features

- User **sign-up** and **sign-in** with **JWT-based authentication**
- Secure password storage using **bcrypt hashing & salting**
- **Protected routes** for authenticated users only
- User profile retrieval and updates
- Fetch account balance
- **ACID-compliant money transfers** using MongoDB transactions

---

## 🛠️ API Endpoints

All routes are prefixed with `/api/v1`.

### 👤 User Routes (`/user`)
| Method | Endpoint     | Description                                      |
|--------|--------------|--------------------------------------------------|
| POST   | /signup      | Create user and account with initial balance     |
| POST   | /signin      | Authenticate user and return JWT                 |
| PUT    | /update      | Update user's info (Protected)                   |
| GET    | /bulk        | Search users by first/last name (Protected)      |
| GET    | /me          | Fetch current user's profile (Protected)         |

### 💰 Account Routes (`/account`)
| Method | Endpoint     | Description                                      |
|--------|--------------|--------------------------------------------------|
| GET    | /balance     | Get account balance (Protected)                  |
| POST   | /transfer    | Transfer money to another user (Protected)       |

---

## 🔐 Key Concepts & Implementation

### 1. Authentication Middleware (`authMiddleware`)
- **Goal**: Protect routes for authenticated users.
- **How**: Extracts JWT from `Authorization` header → verifies it → attaches `req.userId` if valid.

### 2. Password Security: Hashing & Salting
- **Why not plain text?** → Easily compromised if database leaks.
- **bcrypt used for**:
  - **Hashing**: One-way encryption of password
  - **Salting**: Adds randomness to ensure identical passwords don't generate same hash
  - ✅ Prevents **rainbow table** and **brute force** attacks

### 3. MongoDB Schema Design
- **User ↔ Account**: One-to-one via `userId` reference (foreign key style)
- **User Search**: Uses `$or` to allow filtering by either `firstName` or `lastName`
- **Money Storage**: Store amounts like ₹88.88 as `8888` (integers) to avoid floating-point bugs

### 4. Transactions for Money Transfer
- **Why?** Ensure funds are not deducted unless both debit and credit succeed
- **Flow**:
  1. Start session → `mongoose.startSession()`
  2. Start transaction → `session.startTransaction()`
  3. Perform checks and operations using session:
     - Validate balance
     - Debit sender
     - Credit recipient
  4. If all good → `commitTransaction()`
  5. If any failure → `abortTransaction()`
  6. End session → `endSession()`
- A transaction is a sequence of operations that should either all succeed or all fail (atomicity). But MongoDB needs a context to track these grouped operations — that's what a session provides.

- Think of a session like a “container” that keeps track of all operations in your transaction.

- Without it, MongoDB wouldn't know which operations belong together.
- ✅ Ensures **atomicity**, **consistency**, and **rollback** on failure — critical in financial apps

---

