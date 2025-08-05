# Ideas as a Service - MVP Platform

A modern web application for turning business ideas into market-ready businesses. This platform allows users to submit ideas and receive comprehensive business development packages including market research, business plans, brand identity, and team assembly services.

## 🚀 Features

- **Modern Landing Page** with hero section, value proposition, and pricing tiers
- **Multi-step Idea Submission** with file upload support
- **User Dashboard** with progress tracking and deliverables
- **Admin Panel** for managing ideas and workflows
- **Stripe Payment Integration** (test mode ready)
- **Portfolio Section** showcasing successful case studies
- **Authentication System** with JWT tokens
- **Dark/Light Mode Toggle**
- **Fully Responsive Design**

## 🏗️ Project Structure

```
ideas-as-a-service/
├── frontend/          # React TypeScript app with Tailwind CSS
├── backend/           # Node.js Express API with TypeScript
├── shared/            # Shared types and utilities
├── database/          # Prisma schema and migrations
└── docs/             # API documentation
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt
- **Payments**: Stripe (test mode)
- **Email**: Nodemailer
- **File Upload**: Multer
- **Styling**: Tailwind CSS with dark mode support

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL 12 or higher
- npm or yarn
- Stripe account (for payments)
- Email service (Gmail, SendGrid, etc.)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd ideas-as-a-service

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb ideas_as_a_service

# Navigate to backend
cd backend

# Set up environment variables
cp .env.example .env
# Edit .env file with your database credentials and API keys

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

### 3. Configure Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ideas_as_a_service"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### 4. Start Development Servers

```bash
# Terminal 1 - Start backend (from backend directory)
npm run dev

# Terminal 2 - Start frontend (from frontend directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 👤 Default User Accounts

After seeding the database, you can use these accounts:

**Admin Account:**
- Email: admin@ideasasaservice.com
- Password: password123

**Test User Account:**
- Email: test@example.com
- Password: password123

## 💳 Service Tiers

1. **Idea Validation** ($499) - Quick market assessment
2. **Business Blueprint** ($2,999) - Complete business foundation
3. **Launch-Ready Package** ($9,999) - Full market-ready business
4. **Enterprise Innovation** ($25,000+) - Custom enterprise solutions

## 🔧 Development

### Backend Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
```

### Frontend Scripts

```bash
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

## 📊 Database Schema

The application uses Prisma ORM with the following main models:

- **User** - Authentication and user management
- **Idea** - Business ideas submitted by users
- **Deliverable** - Work products for each idea
- **Payment** - Stripe payment tracking
- **Portfolio** - Case studies and success stories
- **Message** - Communication between clients and team

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Ideas
- `POST /api/ideas` - Submit new idea
- `GET /api/ideas` - Get user's ideas
- `GET /api/ideas/:id` - Get specific idea
- `PUT /api/ideas/:id/status` - Update idea status (admin)

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Payment history

### Portfolio
- `GET /api/portfolio` - Get case studies
- `GET /api/portfolio/:id` - Get specific case study

## 🚀 Deployment

### Production Environment Variables

Make sure to update these for production:

```env
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret
DATABASE_URL=your-production-database-url
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
```

### Build for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
1. Check the documentation
2. Create an issue on GitHub
3. Contact the development team

## 🔄 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Real-time notifications
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Automated testing suite
- [ ] CI/CD pipeline
- [ ] Docker containerization

---

Built with ❤️ by the Ideas as a Service team