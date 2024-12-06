# VenEx-backend

VenEx-backend is a Node.js-based backend project built with Express.js and MySQL as the database. It uses TypeScript for type safety and Prisma ORM for database management.

## Features

- **Express.js** for building RESTful APIs.
- **MySQL** as the database.
- **Prisma ORM** for seamless database interaction.
- **TypeScript** for a robust and scalable codebase.
- **Linting and Formatting** using ESLint and Prettier.
- Configurable environment with `.env` file support.
- Logging with Winston.
- API validation with Zod.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [MySQL](https://www.mysql.com/) (v8 or above recommended)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/quickstart)

---

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/harshvsinghme/VenEx-backend.git
   cd VenEx-backend
   ```

2. **Install dependencies**:

   ```bash
   npm i -g pnpm
   pnpm install
   ```

3. **Set up the environment variables**:

   Create a `.env` file in the root directory based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Update the `DATABASE_URL` and `PORT` fields in `.env`:

   ```env
   PORT=4000
   DATABASE_URL="mysql://root:my-secret-pw@localhost:3306/venex"
   ```

---

### Database Setup

1. **Run Prisma migrations**:

   ```bash
   pnpm run prisma:dev
   ```

2. **Generate Prisma client**:

   ```bash
   pnpm run prisma:generate
   ```

3. **Optionally open Prisma Studio** for managing the database:
   ```bash
   pnpm run prisma:studio
   ```

---

### Running the Server

- **In local development mode**:

  ```bash
  pnpm run local
  ```

  On Windows:

  ```bash
  pnpm run local:win
  ```

- **In production mode**:
  ```bash
  pnpm run build
  pnpm run dev
  ```

---

### Scripts

Here are some of the useful scripts defined in the `package.json`:

- **Development**:

  ```bash
  pnpm run local
  ```

  or for Windows:

  ```bash
  pnpm run local:win
  ```

- **Build the project**:

  ```bash
  pnpm run build
  ```

- **Run Prisma migrations**:

  ```bash
  pnpm run prisma:dev
  ```

  or for Windows:

  ```bash
  pnpm run prisma:dev:win
  ```

- **Reset the database**:

  ```bash
  pnpm run prisma:reset
  ```

- **Lint and format the code**:
  ```bash
  pnpm run lint
  pnpm run format
  ```

---

### Project Structure

```
VenEx-backend/
├── controllers/          # API controllers
├── data/                 # Static or mock data files
├── middlewares/          # Custom middleware functions
├── prisma/               # Prisma schema and migrations
├── routes/               # Route definitions
├── types/                # TypeScript type definitions
├── utils/                # Utility functions and helpers
├── index.ts              # Main entry point of the application
├── package.json          # Node.js project configuration
├── pnpm-lock.yaml        # Lockfile for dependency management
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
├── README.md             # Project documentation
```

---

### Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MySQL**
- **Prisma ORM**
- **Zod** for validation
- **Winston** for logging
- **ESLint** and **Prettier** for linting and formatting

### Author

Developed and maintained by the **Harsh**.
