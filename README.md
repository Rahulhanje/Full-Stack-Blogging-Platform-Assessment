<div align="center">

# 🚀 Full-Stack Blogging Platform

### _A Modern, Type-Safe Blogging Experience_

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-10.0-2596BE?style=for-the-badge&logo=trpc&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![Deployment Status](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://full-stack-blogging-platform-assess.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

**[🌐 Live Demo](https://full-stack-blogging-platform-assess.vercel.app/)** • 
**[📖 Documentation](#-quick-start)** • 
**[🐛 Report Bug](https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment/issues)** • 
**[✨ Request Feature](https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment/issues)**

---

*A feature-rich blogging platform built with Next.js 15, TypeScript, tRPC, PostgreSQL, and Drizzle ORM. Features complete user authentication, dark mode, search functionality, and comprehensive blog management.*

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features-implemented)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🎯 Usage Guide](#-usage-guide)
- [🏗 tRPC Architecture](#-trpc-router-structure)
- [🚀 Deployment](#-deployment)
- [🛠 Development Decisions](#-development-decisions--trade-offs)
- [⏱ Time Investment](#-time-investment)
- [🚧 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)

---

## ✨ Features Implemented

<table>
<tr>
<td width="50%">

### 🎯 Priority 1: Core Features

✅ **Blog post CRUD operations**  
✅ **Category CRUD operations**  
✅ **Multi-category assignment**  
✅ **Blog listing with pagination**  
✅ **Individual post view**  
✅ **Category filtering**  
✅ **Responsive navigation**  
✅ **Professional UI/UX**  

</td>
<td width="50%">

### ⚡ Priority 2: Enhanced Features

✅ **User Authentication System**  
✅ **Protected Routes**  
✅ **Search Functionality**  
✅ **Dark Mode Support**  
✅ **Markdown Editor**  
✅ **SEO Optimization**  
✅ **Loading States**  
✅ **Toast Notifications**  

</td>
</tr>
<tr>
<td width="50%">

### 🔥 Priority 3: Advanced Features

✅ **Author-based Content**  
✅ **Draft vs Published status**  
✅ **URL Slug Generation**  
✅ **Responsive Design**  
✅ **Type-safe APIs**  
✅ **Real-time Validation**  
✅ **Performance Optimization**  

</td>
<td width="50%">

### 🔧 Technical Excellence

✅ **Database Schema with relations**  
✅ **tRPC Integration**  
✅ **React Query caching**  
✅ **Markdown Support**  
✅ **Form Validation**  
✅ **Error Boundaries**  
✅ **Mobile-first Design**  
✅ **Authentication Persistence**  

</td>
</tr>
</table>

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technologies |
|:-----:|:------------|
| **🎨 Frontend** | Next.js 15 • TypeScript • Tailwind CSS • React Markdown • React Hook Form |
| **⚙️ Backend** | tRPC • Next.js API Routes • Zod Validation |
| **💾 Database** | PostgreSQL • Drizzle ORM • Schema Migrations |
| **📊 State** | TanStack Query (React Query) • DevTools |
| **🔐 Security** | Custom Auth • Session Management • Protected Routes |
| **🚀 DevOps** | Vercel • ESLint • Git |

</div>

### 🎨 Frontend Excellence

```typescript
🖥️  Next.js 15         → App Router with React 19 Server Components
📘  TypeScript         → Full type safety throughout the application
🎨  Tailwind CSS       → Utility-first CSS with dark mode support
📝  React Markdown     → Beautiful markdown rendering with syntax highlighting
📋  React Hook Form    → Performant forms with seamless validation
```

### ⚙️ Backend & API Layer

```typescript
🔄  tRPC               → End-to-end typesafe APIs without code generation
🌐  Next.js Routes     → Serverless API endpoints with optimal performance
✅  Zod                → Runtime validation and schema inference
```

### 💾 Database & ORM

```sql
🐘  PostgreSQL         → Robust relational database with ACID compliance
🔧  Drizzle ORM        → Modern TypeScript ORM with excellent DX
📊  Migrations         → Version-controlled schema management
```

### 🔐 Authentication & Security

```typescript
🔒  Custom Auth        → Secure user registration and login system
🎫  Session Mgmt       → Persistent authentication state across sessions
🛡️  Protected Routes   → Server-side and client-side route protection
```

---

## 📁 Project Structure

```
📦 Full-Stack-Blogging-Platform
├── 📂 app/                           # Next.js 15 App Router
│   ├── 📂 api/trpc/[trpc]/          # 🔄 tRPC API endpoint
│   ├── 📂 auth/                     # 🔐 Authentication pages
│   │   ├── 📄 signin/               # User login interface
│   │   └── 📄 signup/               # User registration interface
│   ├── 📂 blog/                     # 📝 Blog listing and posts
│   │   ├── 📂 [slug]/               # Dynamic post pages
│   │   └── 📄 page.tsx              # Blog listing with search
│   ├── 📂 categories/               # 🏷️ Category management
│   ├── 📂 dashboard/                # 🎛️ Protected post management
│   │   ├── 📂 edit/[id]/            # Edit existing posts
│   │   ├── 📂 new/                  # Create new posts
│   │   └── 📄 page.tsx              # Dashboard overview
│   ├── 🎨 globals.css               # Global styles
│   ├── 📄 layout.tsx                # Root layout with providers
│   └── 📄 page.tsx                  # Landing/home page
├── 📂 components/                    # 🧩 Reusable React components
│   ├── 🌓 DarkModeToggle.tsx        # Theme switching
│   ├── ⚠️ ErrorState.tsx            # Error handling UI
│   ├── 📌 Footer.tsx                # Site footer
│   ├── ⏳ LoadingSpinner.tsx        # Loading states
│   ├── 🧭 Navbar.tsx                # Navigation with auth
│   └── 🔍 SearchBar.tsx             # Search functionality
├── 📂 lib/                          # 🔧 Core utilities
│   ├── 📂 api/                      # tRPC router definitions
│   │   ├── 📄 categories.ts         # Category CRUD
│   │   ├── 📄 posts.ts              # Post CRUD
│   │   └── 📄 root.ts               # Main router
│   ├── 💾 db.ts                     # Database connection
│   ├── 🔄 providers.tsx             # App providers
│   ├── 📊 schema.ts                 # Database schema
│   ├── 🔌 trpc.ts                   # tRPC client config
│   ├── 🔐 useAuth.ts                # Auth hook
│   └── 🛠️ utils.ts                  # Utilities
├── 📂 scripts/
│   └── 🌱 seed.ts                   # Database seeding
└── ⚙️ Configuration files            # TypeScript, Next.js, Tailwind, etc.
```

---

## ⚡ Quick Start

> **Prerequisites**: Node.js 18+, PostgreSQL, Git

### 🚀 Installation in 3 Steps

<table>
<tr>
<td width="33%">

#### 1️⃣ Clone & Install

```bash
git clone https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment.git

cd Full-Stack-Blogging-Platform-Assessment

npm install
```

</td>
<td width="33%">

#### 2️⃣ Configure Environment

Create `.env.local`:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
PORT=3000
```

</td>
<td width="33%">

#### 3️⃣ Launch

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

</td>
</tr>
</table>

### 🗄️ Database Setup Options

<table>
<tr>
<td width="50%">

#### 🏠 Option A: Local PostgreSQL

```bash
# Create database
createdb blog_db

# Schema auto-created on startup
npm run dev
```

</td>
<td width="50%">

#### ☁️ Option B: Cloud Database (Recommended)

**[Neon](https://neon.tech)** or **[Supabase](https://supabase.com)**

1. Create new project
2. Copy connection string
3. Add to `.env.local`
4. Deploy! 🎉

</td>
</tr>
</table>

### 🎯 Access Points

| Environment | URL | Status |
|:------------|:----|:------:|
| **🏠 Local Development** | http://localhost:3000 | ✅ Ready |
| **🌐 Production** | [Live Demo →](https://full-stack-blogging-platform-assess.vercel.app/) | 🚀 Deployed |

---

## 🎯 Usage Guide

### 🔐 User Authentication Flow

```mermaid
graph LR
    A[👤 Visit Site] --> B{Authenticated?}
    B -->|No| C[📝 Sign Up/Sign In]
    B -->|Yes| D[🎛️ Access Dashboard]
    C --> D
    D --> E[✍️ Create Posts]
    D --> F[🏷️ Manage Categories]
    D --> G[📊 View Analytics]
```

<table>
<tr>
<td width="33%">

### 📝 Step 1: Sign Up
Navigate to `/auth/signup`
- Create account
- Verify email
- Set password

</td>
<td width="33%">

### 🔓 Step 2: Sign In
Access at `/auth/signin`
- Enter credentials
- Stay logged in
- Secure session

</td>
<td width="33%">

### 🎛️ Step 3: Dashboard
Protected route `/dashboard`
- Manage posts
- Create content
- View analytics

</td>
</tr>
</table>

---

### ✍️ Content Management

#### 📄 Creating Blog Posts

> **Navigate**: Dashboard → "Create New Post"

```markdown
1. 📝 Enter post title and content (Markdown supported)
2. 🏷️ Select one or more categories (optional)
3. 💾 Save as Draft or 🚀 Publish immediately
4. 👀 Preview with live markdown rendering
5. ✅ Submit and share!
```

#### 🏷️ Managing Categories

| Action | Description | Location |
|:------:|:-----------|:---------|
| ➕ **Create** | Add new categories with name & description | Categories Page |
| ✏️ **Edit** | Modify category details inline | Categories Page |
| 🗑️ **Delete** | Remove categories (posts retain associations) | Categories Page |
| 📊 **Analytics** | View post counts per category | Categories Page |

#### 🎛️ Post Management Dashboard

<div align="center">

| Feature | Description |
|:-------:|:-----------|
| 📋 **View All Posts** | Complete list with status indicators (Draft/Published) |
| 🔍 **Filter Posts** | Filter by publication status and categories |
| ⚡ **Quick Actions** | Edit, Delete, Toggle Publish Status |
| 📊 **Statistics** | Creation dates, views, and category assignments |

</div>

---

### 🌐 Public Features

<table>
<tr>
<td width="50%">

#### 📚 Blog Discovery

🔍 **Search** - Real-time search by title/content  
🏷️ **Filter** - Category-based filtering with sidebar  
📖 **Browse** - All published posts with pagination  
📝 **Read** - Clean, readable formatting with syntax highlighting  

</td>
<td width="50%">

#### 🎨 User Experience

🌓 **Dark/Light Mode** - System preference detection  
📱 **Responsive** - Optimized for all devices  
⏳ **Loading States** - Smooth transitions  
🔗 **SEO URLs** - Automatic slug generation  

</td>
</tr>
</table>

---

## 🏗 tRPC Router Structure

> **End-to-end type safety without code generation**

<div align="center">

### 🎯 Main Router Architecture

```typescript
📦 appRouter
├── 📝 postsRouter          // Blog post operations
└── 🏷️ categoriesRouter     // Category management
```

</div>

---

<table>
<tr>
<td width="50%">

### 📝 Posts Router (`lib/api/posts.ts`)

```typescript
🌐 PUBLIC ROUTES
├── getAll          // List all posts with filters
└── getBySlug       // Get single post by slug

🔒 PROTECTED ROUTES
├── create          // Create new post
├── update          // Update existing post
├── delete          // Delete post
└── getById         // Get post by ID for editing
```

</td>
<td width="50%">

### 🏷️ Categories Router (`lib/api/categories.ts`)

```typescript
🌐 PUBLIC ROUTES
├── getAll          // List all categories
└── getBySlug       // Get category with posts

🔒 ADMIN ROUTES
├── create          // Create new category
├── update          // Update category
└── delete          // Delete category
```

</td>
</tr>
</table>

---

### ⚡ Key Features

<div align="center">

| Feature | Description | Benefit |
|:-------:|:-----------|:--------|
| 🎯 **Type Safety** | Full TypeScript inference server→client | Zero runtime errors |
| ✅ **Validation** | Zod schemas for runtime checks | Data integrity |
| ⚠️ **Error Handling** | Structured responses with HTTP codes | Better debugging |
| 🔐 **Authentication** | Protected procedures with user context | Secure operations |
| ⚡ **Optimistic Updates** | React Query integration | Smooth UX |

</div>

### 🔄 Data Flow Pipeline

```typescript
1. 🖱️  Client → Calls tRPC procedure
2. ✅  tRPC → Validates input with Zod schemas
3. 🔧  Router → Processes with type-safe DB queries
4. 📦  Response → Auto-typed on client
5. 💾  React Query → Caches & background updates
```

---

## 🚀 Deployment

### 🌟 Vercel Deployment (Recommended)

<table>
<tr>
<td width="25%">

#### 1️⃣ Connect
- Fork repository
- Link GitHub
- Import project

</td>
<td width="25%">

#### 2️⃣ Configure
Add environment variables:
```
DATABASE_URL
JWT_SECRET
```

</td>
<td width="25%">

#### 3️⃣ Database
- Setup [Neon](https://neon.tech)
- Or [Supabase](https://supabase.com)
- Copy connection string

</td>
<td width="25%">

#### 4️⃣ Deploy
- Auto-deploy on push
- Live at `your-app.vercel.app`
- Done! 🎉

</td>
</tr>
</table>

---

### 🔄 Alternative Deployment Options

<div align="center">

| Platform | Command | Features |
|:--------:|:--------|:---------|
| **☁️ Netlify** | `npm run build` | Deploy `.next` folder, edge functions |
| **🚂 Railway** | Connect repo | Add `DATABASE_URL`, auto-deploy |
| **🏠 Self-Hosted** | `npm run build && npm start` | Full control, custom domain |

</div>

### 🔑 Environment Variables Reference

| Variable | Description | Required | Example |
|:--------:|:-----------|:--------:|:--------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ Yes | `your_secure_random_string` |
| `PORT` | Server port | ❌ No | `3000` |
| `NEXTAUTH_URL` | Application URL | ✅ Yes | `https://your-app.vercel.app` |

---

## 🛠 Development Decisions & Trade-offs

<table>
<tr>
<td width="50%">

### 🏗️ Architecture Choices

#### ⚡ Next.js 15 App Router
✅ **Choice**: App Router over Pages Router  
💡 **Reasoning**: Server Components, better performance  
⚖️ **Trade-off**: Newer API, fewer examples  

#### 🔄 tRPC over REST
✅ **Choice**: tRPC for type-safe APIs  
💡 **Reasoning**: End-to-end type safety  
⚖️ **Trade-off**: Learning curve  

#### 💾 Drizzle ORM over Prisma
✅ **Choice**: Drizzle for database  
💡 **Reasoning**: Better TypeScript, smaller bundle  
⚖️ **Trade-off**: Less mature ecosystem  

</td>
<td width="50%">

### 🎨 UI/UX Decisions

#### 📝 Markdown over Rich Text
✅ **Choice**: Markdown with live preview  
💡 **Reasoning**: Faster dev, cleaner storage  
⚖️ **Trade-off**: Less user-friendly  

#### 🌓 Dark Mode
✅ **Choice**: System preference + manual toggle  
💡 **Reasoning**: Modern expectation, accessibility  
⚖️ **Trade-off**: Styling complexity  

#### 📱 Mobile-First Design
✅ **Choice**: Responsive with Tailwind  
💡 **Reasoning**: Mobile traffic dominance  
⚖️ **Trade-off**: Complex CSS management  

</td>
</tr>
</table>

---

### ⚡ Performance Optimizations

<div align="center">

| Optimization | Implementation | Benefit | Trade-off |
|:------------:|:--------------|:--------|:----------|
| **💾 Caching** | React Query aggressive caching | Instant page loads | Complex state management |
| **⚡ Optimistic Updates** | Immediate UI updates | Better perceived performance | Error handling complexity |
| **🔄 Background Sync** | Automatic data revalidation | Always fresh data | Increased API calls |

</div>

### 🔐 Security Considerations

<table>
<tr>
<td width="50%">

#### ✅ Input Validation
- **Implementation**: Zod schemas (client + server)
- **Protection**: XSS, injection, data corruption
- **Coverage**: All forms, API routes, DB ops

</td>
<td width="50%">

#### 🔒 Authentication Security
- **Implementation**: Secure session management
- **Protection**: User data and admin functions
- **Scope**: Server + client-side protection

</td>
</tr>
</table>

---

## ⏱ Time Investment

<div align="center">

### 📊 Development Breakdown (26 Hours Total)

```mermaid
pie title Time Distribution
    "Planning & Setup" : 2
    "Database & tRPC" : 3
    "Authentication" : 4
    "UI Components" : 3
    "Blog Features" : 4
    "Dashboard & CRUD" : 5
    "Dark Mode & Polish" : 3
    "Testing & Debug" : 2
```

</div>

| Phase | ⏱️ Time | 📝 Description |
|:------|:-------:|:-------------|
| 🎯 **Planning & Setup** | 2h | Project structure, dependencies, database schema |
| 💾 **Database & tRPC** | 3h | Drizzle setup, tRPC routers, type definitions |
| 🔐 **Authentication** | 4h | Sign up/in pages, protected routes, session management |
| 🎨 **Core UI Components** | 3h | Navbar, Footer, LoadingSpinner, ErrorState |
| 📝 **Blog Functionality** | 4h | Post listing, individual view, search feature |
| 🎛️ **Dashboard & CRUD** | 5h | Post management, create/edit forms, categories |
| 🌓 **Dark Mode & Polish** | 3h | Theme system, responsive design, UX improvements |
| 🧪 **Testing & Debugging** | 2h | Bug fixes, error handling, performance optimization |

### 🎯 Key Milestones

<table>
<tr>
<td width="25%">

**⏱️ Hour 6**
✅ Blog listing  
✅ Post view  
✅ Basic routing  

</td>
<td width="25%">

**⏱️ Hour 12**
✅ Authentication  
✅ Protected routes  
✅ User sessions  

</td>
<td width="25%">

**⏱️ Hour 18**
✅ Full CRUD  
✅ Dashboard  
✅ Categories  

</td>
<td width="25%">

**⏱️ Hour 26**
✅ Search feature  
✅ Dark mode  
✅ Production ready  

</td>
</tr>
</table>

---

## 🚧 Future Enhancements

<table>
<tr>
<td width="33%">

### 🎯 Priority 1: Immediate

- [ ] 🖼️ **Image Upload**  
  Cloudinary/S3 integration

- [ ] 📝 **Rich Text Editor**  
  WYSIWYG editor replacement

- [ ] 📧 **Email Notifications**  
  New post alerts

- [ ] 📊 **Post Analytics**  
  View count, read time

</td>
<td width="33%">

### ⚡ Priority 2: Enhanced

- [ ] 💬 **Comment System**  
  User engagement

- [ ] 🔗 **Social Sharing**  
  Share on platforms

- [ ] 📰 **RSS Feed**  
  Auto-generated feed

- [ ] 🔗 **Related Posts**  
  Content suggestions

- [ ] 🏷️ **Post Tags**  
  Additional taxonomy

</td>
<td width="33%">

### 🚀 Priority 3: Advanced

- [ ] 🌍 **Multi-language**  
  i18n implementation

- [ ] 👑 **Admin Dashboard**  
  User management

- [ ] 🔒 **Rate Limiting**  
  API protection

- [ ] 🔍 **Advanced Search**  
  Full-text search

- [ ] 📬 **Newsletter**  
  Email campaigns

</td>
</tr>
</table>

---

## 🤝 Contributing

<div align="center">

### We love contributions! 💙

</div>

```bash
1. 🍴 Fork the repository
2. 🌿 Create feature branch       → git checkout -b feature/amazing-feature
3. 💾 Commit your changes         → git commit -m 'Add amazing feature'
4. 🚀 Push to the branch          → git push origin feature/amazing-feature
5. 🎉 Open a Pull Request
```

<div align="center">

### 📝 Contribution Guidelines

| Type | Description | Label |
|:----:|:-----------|:------|
| 🐛 **Bug Fix** | Fix existing issues | `bug` |
| ✨ **Feature** | Add new functionality | `enhancement` |
| 📚 **Documentation** | Improve docs | `documentation` |
| 🎨 **Style** | UI/UX improvements | `design` |
| ⚡ **Performance** | Optimization | `performance` |

---

### 📞 Contact & Support

**Found a bug?** [Open an issue](https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment/issues)  
**Have a question?** [Start a discussion](https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment/discussions)  
**Want to contribute?** Check our [Contributing Guide](CONTRIBUTING.md)

---

### ⭐ Show Your Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/Rahulhanje/Full-Stack-Blogging-Platform-Assessment?style=social)](https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment)
[![GitHub forks](https://img.shields.io/github/forks/Rahulhanje/Full-Stack-Blogging-Platform-Assessment?style=social)](https://github.com/Rahulhanje/Full-Stack-Blogging-Platform-Assessment/fork)

---

<sub>Built with ❤️ by [Rahul Hanje](https://github.com/Rahulhanje) • © 2025</sub>

</div>