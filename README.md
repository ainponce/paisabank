# PaisaBank - Web Mobile Banking Platform

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd paisabank
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npm run db:migrate
npm run db:seed
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/trpc/auth.login` - Login with email and password

### Cards
- `GET /api/trpc/cards.getAll` - Get all user cards (protected)

### Movements/Transactions
- `GET /api/trpc/movements.getLast` - Get last 5 transactions (protected)
- `GET /api/trpc/movements.getAll` - Get all transactions with optional filter (protected)

## Database Schema

### User
- id, email, password, name, token

### Card
- id, userId, issuer, name, expDate, lastDigits, balance, currency

### Transaction
- id, userId, title, amount, transactionType (SUS, CASH_IN, CASH_OUT), date

## Scripts

```bash
npm run dev               # Start development server
npm run build             # Build for production
npm run start             # Start production server
npm run lint              # Run ESLint
npm run db:generate       # Generate Prisma Client
npm run db:migrate        # Run database migrations
npm run db:migrate:deploy # Deploy migrations to production
npm run db:seed           # Seed database with test data
npm run db:studio         # Open Prisma Studio
```

### Local Development Setup

1. Create `.env` file in project root:
```bash
# Copy from Supabase Dashboard > Project Settings > Database
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

2. Run migrations:
```bash
npm run db:migrate
```

3. Seed the database:
```bash
npm run db:seed
```

4. Start development server:
```bash
npm run dev
```