# Os Meus Eventos

A React Native app developed using Expo. This project aims to provide a simple and intuitive way to manage events.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the App](#running-the-app)
6. [Available Scripts](#available-scripts)
7. [Troubleshooting](#troubleshooting)
8. [License](#license)

---

## Project Structure

This project follows a typical structure for a React Native app with Expo:

```plaintext
.
├── assets                 # Icons, images, splash screens
├── src                    # Main source code
│   ├── components         # Reusable components
│   ├── models             # Data models
│   ├── navigation         # App navigation setup
│   ├── screens            # Screen components for the app
│   │   ├── HomeScreen     # Screens related to the home view
│   │   ├── LoginScreen    # Screens for user login
│   │   ├── RegisterScreen # Screens for user registration
│   ├── services           # API or helper services
│       ├── authService.ts # Authentication services
│       ├── eventService.ts # Event management services
├── .env                   # Environment variables file
├── .eslintrc.js           # ESLint configuration
├── .gitignore             # Files to ignore in Git
├── App.tsx                # Main app entry file
├── app.json               # App configuration for Expo
├── babel.config.js        # Babel configuration for Expo
├── env.d.ts               # Type declarations for environment variables
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation (this file)
```
