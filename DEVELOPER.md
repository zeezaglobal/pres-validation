# Developer Guide

## Project Overview

This project is a NestJS-based backend application for prescription validation. It manages entities such as doctors, patients, drugs, prescriptions, and users, and provides RESTful APIs for handling prescription workflows.

## Prerequisites

- Node.js (v18 or above recommended)
- npm (v9 or above)

## Installation & Setup

1. **Repository setup:**
   fork the repository on GitHub and clone it to your local machine:
   ```sh
   https://github.com/zeezaglobal/pres-validation
   ```
   ```sh
   git clone <repo-url> # replace <repo-url> with the actual URL of your forked repository
   cd pres-validation
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure DB Credentials:**
   - Use the following MySQL configuration for your database connection in the `app.module.ts`.:
     ```app.module
     {
       type: 'mysql',
       host: '-----',
       port: 3306,
       username: '----',
       password: '----',
       database: '---',
       entities: [`${__dirname}/**/*.entity{.ts,.js}`],
       synchronize: false,
       extra: {
         charset: 'utf8mb4_general_ci',
         ssl: false,
       },
     }
     ```

## Project Structure

```
/ (root)
├── src/
│   ├── app.controller.ts         # Main controller
│   ├── app.service.ts            # Main service
│   ├── app.module.ts             # Root module
│   ├── main.ts                   # Entry point
│   ├── entities/                 # Entity definitions
│   │   └── entities/             # Doctor, Drug, Patient, etc.
│   └── utils/                    # Utility functions
├── test/                         # End-to-end tests
├── views/                        # Handlebars templates
├── package.json                  # NPM scripts and dependencies
├── tsconfig.json                 # TypeScript config
├── eslint.config.mjs             # ESLint config
└── README.md                     # Project overview
```

## Running the Application

- **Start the server:**
  ```sh
  npm run start
  ```
- **Start in watch mode (development):**
  ```sh
  npm run start:dev
  ```

## Contribution Guidelines

- Fork the repository and create a feature branch.
- Write clear commit messages.
- Follow the existing code style and structure.

## Email Verification Flow

The email verification flow allows users to verify their email addresses using a One-Time Password (OTP) sent via email.

### Endpoints

- **POST `/email-validation/send-otp`**
  - **Body:** `{ "email": "user@example.com" }`
  - Untill we verify the email with a custom domain accounts needs to be created on mailinator.
  - Generates a 6-digit OTP, stores it with a 5-minute expiry, and sends it to the provided email.

- **POST `/email-validation/verify-otp`**
  - **Body:** `{ "email": "user@example.com", "code": "123456" }`
  - Verifies the OTP for the email. If valid and not expired, verification succeeds.

### Implementation Details

- OTPs are stored in the `email_otps` table with expiry and creation timestamps.
- OTPs are sent using SendGrid (API key required in environment config).
- On successful verification, the OTP record is deleted.
