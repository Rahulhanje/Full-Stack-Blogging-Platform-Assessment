# Database Setup

This project uses PostgreSQL with Drizzle ORM. Here's how to set up your database:

## Option 1: Using Neon (Recommended for quick setup)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from the dashboard
4. Add it to your `.env.local` file:
   ```
   DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb"
   ```

## Option 2: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database:
   ```sql
   CREATE DATABASE blog_db;
   ```
3. Add the connection string to your `.env.local` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   ```

## Database Tables

The following tables will be created automatically when you first run the application:

- `posts` - Blog posts with title, content, slug, published status
- `categories` - Blog categories with name, description, slug  
- `post_categories` - Many-to-many relationship between posts and categories

## Environment Variables

Make sure your `.env.local` file contains:
```
DATABASE_URL="your_database_connection_string_here"
```

## Running Migrations

The database schema is automatically synced when you run the application. For production deployments, you may want to run explicit migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```