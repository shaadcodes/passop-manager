# PassOP — Zero-Knowledge Full-Stack Password Manager

PassOP is a full-stack, zero-knowledge password management web application designed to deliver end-to-end credential privacy[cite: 1, 3]. Built with a Go REST API backend and a React/TypeScript frontend, PassOP ensures that plain-text passwords never leave the user's browser[cite: 1, 3]. Cryptographic keys are derived locally in client RAM and payloads are encrypted using standard browser Web Crypto APIs prior to network transmission[cite: 1, 3].

## Architectural Overview

                                        +---------------------------------+
                                        |     Browser (React Client)      |
                                        |  - Web Crypto API (AES-GCM)     |
                                        |  - PBKDF2 Key Derivation        |
                                        +---------------------------------+
                                                        |
                                                        | TLS / JSON Payload
                                                        | (Ciphertext Only)
                                                        v
                                        +---------------------------------+
                                        |     Backend (Go REST API)       |
                                        |  - Chi Router & Middleware      |
                                        |  - JWT Bearer Authentication    |
                                        +---------------------------------+
                                                        |
                                                        | PostgreSQL Connection Pool
                                                        | (pgxpool / IPv4 Pooler)
                                                        v
                                        +---------------------------------+
                                        |     Database (Supabase)         |
                                        |  - Relational Schema            |
                                        |  - Users, Vaults, Entries       |
                                        +---------------------------------+

## Key Features

- **Zero-Knowledge Encryption**: All vault secrets are encrypted and decrypted strictly on the client side using 256-bit AES-GCM[cite: 1, 3]. Master keys exist only in browser memory and are never transmitted or stored on server infrastructure[cite: 1, 3].
- **Stateless Go API**: A lightweight Go microservice built with the Chi router for high-throughput request handling and minimal memory overhead[cite: 1, 3].
- **Database Connection Pooling**: Built with `pgxpool` for concurrent, thread-safe PostgreSQL transaction management[cite: 1, 12].
- **JWT Session Management**: Secure user authentication backed by `bcrypt` password hashing for account access[cite: 1, 3].
- **Automated Cloud Infrastructure**: Containerized with Docker and deployed across production platforms[cite: 1, 3, 6].

## Tech Stack

### Frontend

- **Framework**: React, TypeScript, Vite[cite: 1, 3]
- **Styling**: Tailwind CSS[cite: 1, 3]
- **Cryptography**: Web Crypto API (`PBKDF2`, `AES-GCM-256`)[cite: 1, 3]
- **Hosting**: Vercel[cite: 1, 3]

### Backend

- **Language**: Go[cite: 1, 3]
- **Router**: Chi[cite: 1, 3]
- **Database Driver**: `pgx/v5` (`pgxpool`)[cite: 1, 12]
- **Authentication**: JWT, `golang.org/x/crypto/bcrypt`[cite: 1, 3]
- **Containerization**: Docker (`linux/amd64`)[cite: 1, 3, 6]
- **Hosting**: Render[cite: 1, 3]

### Database

- **Engine**: PostgreSQL[cite: 1, 3]
- **Provider**: Supabase[cite: 1, 3]

## Security Model

1. **Key Derivation**: When a user logs in, `PBKDF2` derives an encryption key from the Master Password using a unique salt.
2. **Payload Encryption**: Adding or updating vault entries triggers client-side `AES-GCM-256` encryption.
3. **Zero Ingestion**: The backend receives and persists only encrypted byte strings (`encrypted_password`), domain metadata, and user identifiers[cite: 1, 3, 7].
4. **Decryption**: Decryption occurs entirely in browser RAM upon fetching vault payloads[cite: 1, 3]. If the Master Password is lost, vault data cannot be recovered by system administrators[cite: 10].

## Getting Started

### Prerequisites

- Go 1.24 or higher[cite: 8]
- Node.js 18 or higher
- Docker Engine
- Supabase PostgreSQL Database[cite: 1, 3]

### Backend Setup

1. Clone the repository:

   ```bash
   git clone [https://github.com/shaadcodes/passop.git](https://github.com/shaadcodes/passop.git)
   cd passop/passop-backend

   ```

2. Configure environment variables in a `.env` file:

   ```bash
   PORT=8080
   DATABASE_URL=postgres://postgres:[PASSWORD]@[HOST]:6543/postgres?sslmode=require
   JWT_SECRET=your_jwt_secret_key

   ```

3. Run locally:
   ```bash
   go run main.go
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../passop-frontend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Configure environment variables in `.env.local`:

   ```bash
   VITE_API_BASE_URL=http://localhost:8080/api

   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

```sql
    CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    master_password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE vaults (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE password_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vault_id UUID REFERENCES vaults(id) ON DELETE CASCADE,
        website_name VARCHAR(255) NOT NULL,
        website_url TEXT,
        username VARCHAR(255) NOT NULL,
        encrypted_password TEXT NOT NULL,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
```

## Deployment

### Docker Build

To build the container for cloud environments:

```bash
docker buildx build --platform linux/amd64 -t shaadcodes/passop-backend:latest --push .
```

### License

Distributed under the MIT License.
