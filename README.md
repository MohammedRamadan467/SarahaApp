SarahaApp — Anonymous Messaging REST API

A RESTful backend application built with Node.js, Express.js, and MongoDB that enables users to receive anonymous messages while maintaining secure account management and authentication.

Features

Authentication & Security

- User registration and login.
- Email verification using OTP codes.
- Resend email verification codes.
- Forgot password and password reset workflows.
- Google sign-in integration.
- Two-step verification (2FA).
- JWT-based authentication.
- Access and refresh token management.
- Password hashing and secure account management.
- Login attempt tracking and rate limiting.

Messaging System

- Send anonymous messages to registered users.
- Retrieve sent and received messages.
- Retrieve individual messages.
- Delete messages with ownership validation.
- Message attachment support.

User Management

- Retrieve and update user profiles.
- Profile image uploads.
- File upload validation using Multer.
- Phone number encryption and decryption.

Backend Architecture

- Modular application structure.
- Separation of controllers, services, and repositories.
- Reusable database operations.
- Centralized error handling.
- Request validation using Zod.
- MongoDB integration using Mongoose.
- Redis integration for temporary data and security-related operations.
- Environment-based configuration.

Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- ODM: Mongoose
- Caching: Redis
- Authentication: JWT
- Validation: Zod
- File Uploads: Multer
- Email Service: Nodemailer
- Security: Password Hashing, Encryption, Helmet, and Rate Limiting
- Authentication Provider: Google OAuth

Installation

1. Install Dependencies

npm install

2. Configure Environment Variables

Create the required environment configuration files and provide the necessary settings for:

- MongoDB connection
- Redis connection
- JWT secrets
- Email service credentials
- Google OAuth credentials
- Encryption keys

Important: Never commit secrets or real credentials to GitHub.

4. Run the Application

Development mode:

npm run start:dev

Production mode:

npm run start:prod

What I Learned

- Building RESTful APIs using Node.js and Express.js.
- Implementing authentication and authorization workflows.
- Developing email verification and password recovery features.
- Implementing two-step verification.
- Working with JWT access and refresh tokens.
- Managing MongoDB databases using Mongoose.
- Using Redis for temporary data and security operations.
- Implementing file uploads and validation.
- Structuring backend applications using reusable modules.
- Handling errors and validating incoming requests.


Aspiring Node.js Backend Developer

- GitHub: "MohammedRamadan467" (https://github.com/MohammedRamadan467)
