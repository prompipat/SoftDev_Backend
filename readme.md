# SoftDev_Backend

A simple Node.js backend using Supabase for database operations.

## Features

- REST API for user management
- Supabase integration
- Environment variable support

## Getting Started

### Prerequisites

- Node.js
- Supabase account

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/prompipat/SoftDev_Backend.git
   cd SoftDev_Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.example.env` to `.env` and fill in your Supabase credentials:
   ```sh
   cp .example.env .env
   # Edit .env with your SUPABASE_URL and SUPABASE_KEY
   ```

### Running the Server

```sh
npm start
```

Server will run at `http://localhost:8000`

## API Endpoints

- `GET /` - Health check
- `GET /users` - Get all users
- `POST /users` - Add a user (body: `{ name, email }`)

## Environment Variables

See `.example.env` for required variables:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `DATABASE_URL` (optional)

## License

MIT
