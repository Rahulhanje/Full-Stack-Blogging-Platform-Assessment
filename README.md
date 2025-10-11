# Full-Stack Blogging Platform

A modern blogging platform built with Next.js 15, TypeScript, tRPC, PostgreSQL, and Drizzle ORM.

## Features Implemented

### ✅ Priority 1 (Core Requirements)
- [x] Blog post CRUD operations (create, read, update, delete)
- [x] Category CRUD operations  
- [x] Assign one or more categories to posts
- [x] Blog listing page showing all posts
- [x] Individual post view page
- [x] Category filtering on listing page
- [x] Basic responsive navigation
- [x] Clean, professional UI

### 🔧 Technical Features
- [x] Database schema with Drizzle ORM
- [x] Type-safe APIs using tRPC
- [x] React Query integration for data fetching
- [x] Markdown support for content
- [x] Slug generation for posts and categories
- [x] Draft vs Published post status
- [x] Loading and error states
- [x] Mobile-responsive design

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: tRPC, Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query) via tRPC
- **Content**: Markdown support with react-markdown
- **Validation**: Zod schemas

## Project Structure

```
blog/
├── app/                          # Next.js App Router pages
│   ├── api/trpc/[trpc]/         # tRPC API routes
│   ├── blog/                    # Blog listing and post pages
│   ├── categories/              # Category management
│   ├── dashboard/               # Post management dashboard
│   └── layout.tsx               # Root layout with providers
├── components/                   # Reusable UI components
├── lib/                         # Core utilities and configuration
│   ├── api/                     # tRPC routers
│   ├── db.ts                    # Database connection
│   ├── schema.ts                # Database schema
│   ├── utils.ts                 # Utility functions
│   └── providers.tsx            # tRPC and React Query providers
└── package.json
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment.git
   cd Full-Stack-Blogging-Platform-Assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your database configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   
   # For Neon Database (recommended)
   # DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb"
   ```

4. **Database Setup**
   - Create a PostgreSQL database
   - The schema will be created automatically by Drizzle when you run the app
   - For production, run migrations using your database provider's tools

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## Usage

### Navigation
- **Home**: Landing page with features overview
- **Blog**: View all published blog posts with category filtering
- **Categories**: Manage blog categories (CRUD operations)
- **Dashboard**: Manage blog posts (create, edit, delete, publish/unpublish)

### Creating Content
1. Go to Dashboard → "New Post"
2. Enter title and content (Markdown supported)
3. Assign categories (optional)
4. Save as draft or publish immediately

### Managing Categories
1. Go to Categories page
2. Create new categories with name and description
3. Edit or delete existing categories
4. Categories can be assigned to posts during creation/editing

## API Routes

The application uses tRPC for type-safe API routes:

- `posts.*` - Blog post operations (CRUD, filtering, category assignment)
- `categories.*` - Category operations (CRUD, get posts by category)

All routes are automatically typed and provide runtime validation with Zod schemas.

## Deployment

The application is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add your `DATABASE_URL` environment variable
3. Deploy automatically with git pushes

## Development Decisions

- **Markdown over Rich Text**: Chose markdown for faster development and better developer experience
- **App Router**: Used Next.js 15 App Router for modern React patterns
- **tRPC**: Provides end-to-end type safety without code generation
- **Tailwind CSS**: Rapid UI development with utility classes
- **Drizzle ORM**: Modern TypeScript ORM with excellent type inference

## Time Investment

- **Database Schema & tRPC Setup**: 2 hours
- **Core UI Components**: 1 hour  
- **Blog Listing & Post Pages**: 2 hours
- **Dashboard & Post Management**: 3 hours
- **Categories Management**: 1.5 hours
- **Testing & Polish**: 1 hour

**Total**: ~10.5 hours

## Future Enhancements

Priority 2 & 3 features that could be added:
- Search functionality for posts
- Image upload support
- SEO meta tags
- Dark mode toggle
- User authentication
- Comments system
- Post statistics and analytics
