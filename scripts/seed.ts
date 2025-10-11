import { db } from '../lib/db';
import { posts, categories, postCategories } from '../lib/schema';
import { createSlug } from '../lib/utils';

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Create sample categories
    const [techCategory] = await db
      .insert(categories)
      .values({
        name: 'Technology',
        description: 'Posts about technology and programming',
        slug: createSlug('Technology'),
      })
      .returning();

    const [lifestyleCategory] = await db
      .insert(categories)
      .values({
        name: 'Lifestyle',
        description: 'Posts about lifestyle and personal development',
        slug: createSlug('Lifestyle'),
      })
      .returning();

    console.log('✅ Categories created');

    // Create sample posts
    const [firstPost] = await db
      .insert(posts)
      .values({
        title: 'Welcome to Our Blog',
        content: `# Welcome to Our Blog

This is our first blog post! We're excited to share our thoughts and ideas with you.

## What to Expect

- **Technology insights** - Latest trends and tutorials
- **Lifestyle tips** - Personal development and productivity
- **Regular updates** - Fresh content every week

## Getting Started

This blog is built with modern technologies:

- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- tRPC for type-safe APIs
- PostgreSQL with Drizzle ORM

### Code Example

\`\`\`javascript
function welcome() {
  console.log('Welcome to our blog!');
}
\`\`\`

> Thanks for reading our first post. More exciting content coming soon!

Happy reading! 🚀`,
        slug: createSlug('Welcome to Our Blog'),
        published: true,
      })
      .returning();

    const [secondPost] = await db
      .insert(posts)
      .values({
        title: 'Building Modern Web Applications',
        content: `# Building Modern Web Applications

In this post, we'll explore the key principles of building modern web applications.

## Key Technologies

1. **Frontend Frameworks**
   - React for component-based UI
   - Next.js for full-stack capabilities
   - TypeScript for better developer experience

2. **Backend Solutions**
   - tRPC for type-safe APIs
   - Drizzle ORM for database operations
   - PostgreSQL for data persistence

## Best Practices

### Code Quality
- Use TypeScript throughout your application
- Implement proper error handling
- Write meaningful tests

### Performance
- Optimize images and assets
- Implement proper caching strategies
- Use code splitting for better load times

### User Experience
- Design responsive layouts
- Provide proper loading states
- Handle errors gracefully

## Conclusion

Building modern web applications requires the right combination of tools, patterns, and best practices. Focus on developer experience and user satisfaction.

*This is a draft post for demonstration purposes.*`,
        slug: createSlug('Building Modern Web Applications'),
        published: false,
      })
      .returning();

    console.log('✅ Posts created');

    // Assign categories to posts
    await db.insert(postCategories).values([
      { postId: firstPost.id, categoryId: techCategory.id },
      { postId: firstPost.id, categoryId: lifestyleCategory.id },
      { postId: secondPost.id, categoryId: techCategory.id },
    ]);

    console.log('✅ Post categories assigned');
    console.log('🎉 Database seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed().then(() => {
  console.log('✨ Seeding completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Seeding failed:', error);
  process.exit(1);
});