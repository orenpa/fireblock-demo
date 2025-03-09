# Fireblocks Demo Application

## Overview

The Fireblocks Demo Application is a full-stack web application that simulates a simple cryptocurrency wallet system. Users can register, log in, view their wallet balances, and perform transactions with other users using supported cryptocurrencies (e.g., BTC, ETH, ADA).

### Key Features

- User authentication (registration and login)
- Wallet generation with public/private key pairs
- View wallet balances in different currencies
- Transfer funds between wallets with transaction history
- Frontend built with Next.js and Tailwind CSS
- Backend built with Node.js, Express, and TypeORM (MySQL database)
- Server-Side Rendering (SSR) used in Profile and Dashboard pages for secure authentication and data fetching
- Designed for desktop use only; not designed for mobile devices

---

## Backend

### Tech Stack

- **Node.js**: Backend server
- **Express.js**: Web framework
- **TypeORM**: Object-Relational Mapping (ORM) for MySQL
- **MySQL**: Database
- **JWT Authentication**: User login and session management
- **Crypto Module**: Key pair generation and transaction signing

### Project Structure

```plaintext
backend/
├── src
│   ├── controllers       # Express route controllers
│   ├── model             # TypeORM entities (User, Wallet, Transaction)
│   ├── service           # Business logic for authentication and transactions
│   ├── utils             # Utility functions (e.g., logger)
│   ├── data-source.ts    # Database connection and TypeORM config
│   ├── app.ts            # Express server setup
│   └── route             # API route definitions
└── package.json          # Dependencies and scripts
```

### Database Tables and Relations

- **User Table**: Stores user information (id, username, password, walletId).
- **Wallet Table**: Linked to users, stores wallet addresses and key pairs.
- **Currency Balance Table**: Holds currency balances per wallet (currency, amount, walletId).
- **Transaction Table**: Logs all transactions between users (amount, currency, fromUserId, toUserId, signature).

**Relations**

- One-to-One between User and Wallet (`user.walletId -> wallet.id`).
- One-to-Many between Wallet and Currency Balances (`wallet.id -> currency_balance.walletId`).
- Many-to-One for Transactions (`transaction.fromUserId` and `transaction.toUserId` reference `user.id`).

### How to Run the Backend

1. **Install dependencies**

```bash
cd backend
npm install
```

2. **Set up MySQL database**

```sql
CREATE DATABASE fireblocks;
```

3. **Start the server**

```bash
npm run dev
```

Server runs on `http://localhost:8000`

### Key API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user
- `GET /api/user/profile`: Get authenticated user's profile
- `POST /api/transactions`: Create a new transaction
- `GET /api/transactions`: Get all transactions for the authenticated user

---

## Frontend

### Tech Stack

- **Next.js**: React framework
- **Tailwind CSS**: Styling
- **Axios**: API requests
- **JWT for authentication**

### Project Structure

```plaintext
frontend/
├── src
│   ├── app                # Next.js pages
│   ├── components         # Reusable UI components
│   ├── services           # API services using Axios
│   ├── interfaces         # TypeScript interfaces
│   ├── styles             # Global styles
│   ├── config             # Configuration files
│   ├── enums              # Application reusable constants
│   └── constants          # Centralized application constants
└── package.json           # Dependencies and scripts
```

### How to Run the Frontend

1. **Install dependencies**

```bash
cd frontend
npm install
```

2. **Start the development server**

```bash
npm run dev
```

Frontend is accessible at `http://localhost:3000`

### Main Pages

- `/login`: User login page
- `/profile`: Shows the user's wallet address and balances
- `/dashboard`: Allows transactions and shows transaction history

### Server-Side Rendering (SSR) Implementation

The Profile and Dashboard pages utilize Next.js's Server-Side Rendering (SSR) capabilities. Authentication tokens are securely retrieved on the server side using Next.js's `cookies()` method. Relevant user and transaction data are fetched before rendering and then passed as props to client components. This approach enhances security by avoiding token exposure in the browser and improves performance by rendering the initial page on the server.

---

## Future Enhancements

- Implementing real blockchain integration for smart contracts
