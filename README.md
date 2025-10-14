# Full-Stack Blogging Platform

A modern, feature-rich blogging platform built with Next.js 15, TypeScript, tRPC, PostgreSQL, and Drizzle ORM. Features complete user authentication, dark mode, search functionality, and comprehensive blog management.

## 🚀 Live Demo

**[View Live Deployment →](https://full-stack-blogging-platform-assess.vercel.app/)**

## ✨ Features Implemented

### ✅ Priority 1 (Core Requirements)
- [x] **Blog post CRUD operations** (create, read, update, delete)
- [x] **Category CRUD operations** with full management interface
- [x] **Multi-category assignment** to posts with intuitive selection
- [x] **Blog listing page** with pagination and filtering
- [x] **Individual post view** with markdown rendering
- [x] **Category filtering** on listing page with dynamic counts
- [x] **Responsive navigation** with mobile hamburger menu
- [x] **Professional UI/UX** with modern design patterns

### ✅ Priority 2 (Enhanced Features)
- [x] **User Authentication System** (sign up, sign in, logout)
- [x] **Protected Routes** for dashboard and post management
- [x] **Search Functionality** across posts with real-time results
- [x] **Dark Mode Support** with system preference detection
- [x] **Markdown Editor** with live preview
- [x] **SEO Optimization** with meta tags and Open Graph
- [x] **Loading States** and error handling throughout
- [x] **Toast Notifications** for user feedback

### ✅ Priority 3 (Advanced Features)
- [x] **Author-based Content** (users only see/edit their own posts)
- [x] **Draft vs Published** post status management
- [x] **URL Slug Generation** for SEO-friendly URLs
- [x] **Responsive Design** optimized for all devices
- [x] **Type-safe APIs** with full TypeScript integration
- [x] **Real-time Validation** with Zod schemas
- [x] **Performance Optimization** with React Query caching

### 🔧 Technical Features
- [x] **Database Schema** with relations and constraints
- [x] **tRPC Integration** for end-to-end type safety
- [x] **React Query** for efficient data fetching and caching
- [x] **Markdown Support** with syntax highlighting
- [x] **Form Validation** with real-time feedback
- [x] **Error Boundaries** and graceful error handling
- [x] **Mobile-first Design** with Tailwind CSS
- [x] **Authentication Persistence** with secure session management

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - App Router with React 19 Server Components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework with dark mode
- **React Markdown** - Markdown rendering with syntax highlighting
- **React Hook Form** - Performant forms with validation

### Backend & API
- **tRPC** - End-to-end typesafe APIs without code generation
- **Next.js API Routes** - Serverless API endpoints
- **Zod** - Runtime validation and TypeScript schema inference

### Database & ORM
- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - Modern TypeScript ORM with excellent DX
- **Database Migrations** - Version-controlled schema management

### Data Fetching & State
- **TanStack Query (React Query)** - Server state management via tRPC
- **React Query DevTools** - Development debugging tools

### Authentication & Security
- **Custom Auth System** - Secure user registration and login
- **Session Management** - Persistent authentication state
- **Protected Routes** - Server-side and client-side protection

### Development & Deployment
- **ESLint & TypeScript** - Code quality and type checking
- **Vercel** - Seamless deployment with automatic previews
- **Git** - Version control with meaningful commit history

## 📁 Project Structure

```
blog/
├── app/                          # Next.js 15 App Router
│   ├── api/trpc/[trpc]/         # tRPC API endpoint
│   ├── auth/                    # Authentication pages
│   │   ├── signin/              # User login page
│   │   └── signup/              # User registration page
│   ├── blog/                    # Blog listing and individual posts
│   │   ├── [slug]/              # Dynamic post pages
│   │   └── page.tsx             # Blog listing with search
│   ├── categories/              # Category management interface
│   ├── dashboard/               # Protected post management
│   │   ├── edit/[id]/           # Edit existing posts
│   │   ├── new/                 # Create new posts
│   │   └── page.tsx             # Dashboard overview
│   ├── globals.css              # Global styles and Tailwind
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Landing/home page
├── components/                   # Reusable React components
│   ├── DarkModeToggle.tsx       # Theme switching component
│   ├── ErrorState.tsx           # Error handling UI
│   ├── Footer.tsx               # Site footer
│   ├── LoadingSpinner.tsx       # Loading state components
│   ├── Navbar.tsx               # Navigation with auth
│   └── SearchBar.tsx            # Search functionality
├── lib/                         # Core utilities and configuration
│   ├── api/                     # tRPC router definitions
│   │   ├── categories.ts        # Category CRUD operations
│   │   ├── posts.ts             # Post CRUD operations
│   │   └── root.ts              # Main tRPC router
│   ├── db.ts                    # Database connection setup
│   ├── providers.tsx            # tRPC and React Query providers
│   ├── schema.ts                # Database schema with Drizzle
│   ├── trpc.ts                  # tRPC client configuration
│   ├── useAuth.ts               # Authentication hook
│   └── utils.ts                 # Utility functions
├── scripts/
│   └── seed.ts                  # Database seeding script
├── types/
│   └── css.d.ts                 # TypeScript declarations
├── drizzle.config.ts            # Drizzle ORM configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## ⚡ Quick Start

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PostgreSQL Database** - Local installation or cloud service (Neon, Supabase, etc.)
- **Git** - For cloning the repository

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment.git
cd Full-Stack-Blogging-Platform-Assessment

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"

# For Neon Database (recommended for production)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# For Supabase
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

#JWT Secret
JWT_SECRET="your_jwt_key"

NEXTAUTH_URL="http://localhost:3000"
# Optional: Custom port (default is 3000)
PORT=3000
```

### 3. Database Setup

#### Option A: Local PostgreSQL
```bash
# Create a new database
createdb blog_db

# The schema will be automatically created when you start the app
```

#### Option B: Cloud Database (Recommended)
1. **Neon (Free tier available)**:
   - Go to [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string to your `.env.local`

2. **Supabase (Free tier available)**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get the database URL from Settings → Database

### 4. Run the Application
```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 5. Access the Application
- **Local Development**: [http://localhost:3000](http://localhost:3000)
- **Production**: [Preview](https://full-stack-blogging-platform-assess.vercel.app/)

## 🎯 Usage Guide

### User Authentication
1. **Sign Up**: Create a new account at `/auth/signup`
2. **Sign In**: Access your account at `/auth/signin`
3. **Dashboard Access**: Authenticated users can access `/dashboard`

### Content Management

#### Creating Blog Posts
1. Navigate to **Dashboard** → **"Create New Post"**
2. Enter post **title** and **content** (Markdown supported)
3. Select one or more **categories** (optional)
4. Choose to **Save as Draft** or **Publish** immediately
5. **Preview** your content with the live markdown preview

#### Managing Categories
1. Go to the **Categories** page
2. **Create** new categories with name and description
3. **Edit** existing categories inline
4. **Delete** categories (posts will retain category associations)
5. View **post counts** for each category

#### Post Management Dashboard
- **View all your posts** with status indicators (Draft/Published)
- **Filter posts** by publication status
- **Quick actions**: Edit, Delete, Toggle Publish Status
- **Post statistics**: View creation dates and category assignments

### Public Features

#### Blog Discovery
- **Browse all published posts** on the main blog page
- **Search posts** in real-time by title and content
- **Filter by category** using the sidebar
- **Read individual posts** with clean, readable formatting

#### Navigation & User Experience
- **Dark/Light mode toggle** with system preference detection
- **Responsive design** that works on all devices
- **Loading states** and **error handling** throughout
- **SEO-optimized URLs** with automatic slug generation

## 🏗 tRPC Router Structure

The application uses tRPC for type-safe API routes with the following structure:

### Main Router (`lib/api/root.ts`)
```typescript
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  categories: categoriesRouter,
})
```

### Posts Router (`lib/api/posts.ts`)
```typescript
postsRouter = {
  // Public routes
  getAll: publicProcedure      // Get all posts with filtering
  getBySlug: publicProcedure   // Get single post by slug
  
  // Protected routes  
  create: protectedProcedure   // Create new post
  update: protectedProcedure   // Update existing post
  delete: protectedProcedure   // Delete post
  getById: protectedProcedure  // Get post by ID for editing
}
```

### Categories Router (`lib/api/categories.ts`)
```typescript
categoriesRouter = {
  // Public routes
  getAll: publicProcedure      // Get all categories
  getBySlug: publicProcedure   // Get category with posts
  
  // Admin routes
  create: protectedProcedure   // Create new category
  update: protectedProcedure   // Update category
  delete: protectedProcedure   // Delete category
}
```

### Key Features:
- **Type Safety**: Full TypeScript inference from server to client
- **Input Validation**: Zod schemas for runtime validation
- **Error Handling**: Structured error responses with proper HTTP codes
- **Authentication**: Protected procedures with user context
- **Optimistic Updates**: React Query integration for smooth UX

### Data Flow:
1. **Client** calls tRPC procedure
2. **tRPC** validates input with Zod schemas
3. **Router** processes request with type-safe database queries
4. **Response** is automatically typed on the client
5. **React Query** handles caching and background updates

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**:
   - Fork this repository to your GitHub account
   - Connect your GitHub account to [Vercel](https://vercel.com)
   - Import the project from your repository

2. **Environment Variables**:
   Add these in your Vercel dashboard under Settings → Environment Variables:
   ```
   DATABASE_URL=your_production_database_url
   ```

3. **Database Setup**:
   - Use [Neon](https://neon.tech) for a free PostgreSQL database
   - Or [Supabase](https://supabase.com) for a free PostgreSQL database
   - Copy the connection string to your Vercel environment variables

4. **Deploy**:
   - Vercel will automatically deploy on every push to main branch
   - Your app will be available at `https://your-app.vercel.app`

### Alternative Deployment Options

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Railway
- Connect your GitHub repository
- Add DATABASE_URL environment variable
- Deploy automatically

#### Self-Hosted
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@host:5432/db` |
| `PORT` | Server port (optional) | No | `3000` |

### Database Migration for Production

The database schema is automatically created when the application starts. For production environments, ensure your database user has the necessary permissions to create tables.

## 🛠 Development Decisions & Trade-offs

### Architecture Choices

#### **Next.js 15 App Router**
- ✅ **Choice**: Used App Router over Pages Router
- **Reasoning**: Better performance with Server Components, improved DX
- **Trade-off**: Newer API with fewer community examples

#### **tRPC over REST**
- ✅ **Choice**: tRPC for type-safe APIs
- **Reasoning**: End-to-end type safety, no code generation needed
- **Trade-off**: Learning curve for developers unfamiliar with tRPC

#### **Drizzle ORM over Prisma**
- ✅ **Choice**: Drizzle for database operations
- **Reasoning**: Better TypeScript integration, smaller bundle size
- **Trade-off**: Less mature ecosystem than Prisma

#### **Custom Auth over NextAuth**
- ✅ **Choice**: Custom authentication system
- **Reasoning**: Full control over user flow, simpler setup for this use case
- **Trade-off**: More implementation time, manual security considerations

### UI/UX Decisions

#### **Markdown over Rich Text Editor**
- ✅ **Choice**: Markdown with live preview
- **Reasoning**: Faster development, better for developers, cleaner storage
- **Trade-off**: Less user-friendly for non-technical users

#### **Dark Mode Implementation**
- ✅ **Choice**: System preference detection with manual toggle
- **Reasoning**: Modern user expectation, better accessibility
- **Trade-off**: Additional complexity in styling and state management

#### **Mobile-First Design**
- ✅ **Choice**: Responsive design with Tailwind CSS
- **Reasoning**: Mobile traffic dominance, better user experience
- **Trade-off**: More complex CSS class management

### Performance Optimizations

#### **React Query for Caching**
- ✅ **Choice**: Aggressive caching with background updates
- **Reasoning**: Better UX with instant page loads, reduced server load
- **Trade-off**: More complex state management

#### **Optimistic Updates**
- ✅ **Choice**: Immediate UI updates before server confirmation
- **Reasoning**: Perceived performance improvement
- **Trade-off**: Error handling complexity

### Security Considerations

#### **Input Validation**
- ✅ **Implementation**: Zod schemas on both client and server
- **Reasoning**: Prevent XSS, injection attacks, data corruption
- **Coverage**: All form inputs, API routes, database operations

#### **Authentication Security**
- ✅ **Implementation**: Secure session management, protected routes
- **Reasoning**: Protect user data and admin functionality
- **Scope**: Server-side and client-side route protection

## ⏱ Time Investment

### Development Breakdown
| Phase | Time Spent | Description |
|-------|------------|-------------|
| **Planning & Setup** | 2 hours | Project structure, dependencies, database schema |
| **Database & tRPC** | 3 hours | Drizzle setup, tRPC routers, type definitions |
| **Authentication System** | 4 hours | Sign up/in pages, protected routes, session management |
| **Core UI Components** | 3 hours | Navbar, Footer, LoadingSpinner, ErrorState |
| **Blog Functionality** | 4 hours | Post listing, individual post view, search |
| **Dashboard & CRUD** | 5 hours | Post management, create/edit forms, category management |
| **Dark Mode & Polish** | 3 hours | Theme system, responsive design, UX improvements |
| **Testing & Debugging** | 2 hours | Bug fixes, error handling, optimization |

**Total Development Time**: ~26 hours

### Key Milestones
- **Hour 6**: Basic blog listing and post view working
- **Hour 12**: Complete authentication and protected routes
- **Hour 18**: Full CRUD operations and dashboard
- **Hour 24**: Search, dark mode, and responsive design
- **Hour 26**: Final polish and deployment ready

## 🚧 Future Enhancements

### Immediate Improvements (Priority 1)
- [ ] **Image Upload**: Cloudinary or AWS S3 integration for post images
- [ ] **Rich Text Editor**: Replace markdown with WYSIWYG editor
- [ ] **Email Notifications**: Notify users of new posts in followed categories
- [ ] **Post Analytics**: View count, read time estimation

### Enhanced Features (Priority 2)
- [ ] **Comment System**: User comments on blog posts
- [ ] **Social Sharing**: Share posts on social media platforms
- [ ] **RSS Feed**: Auto-generated RSS feed for blog posts
- [ ] **Related Posts**: Algorithm to suggest related content
- [ ] **Post Tags**: Additional tagging system beyond categories

### Advanced Features (Priority 3)
- [ ] **Multi-language Support**: i18n implementation
- [ ] **Admin Dashboard**: User management, analytics, moderation
- [ ] **API Rate Limiting**: Protect against abuse
- [ ] **Advanced Search**: Full-text search with filters
- [ ] **Newsletter System**: Email subscriptions and campaigns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request