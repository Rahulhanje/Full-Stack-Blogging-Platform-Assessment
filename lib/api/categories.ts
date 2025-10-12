import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../trpc';
import { db } from '../db';
import { categories, postCategories, posts } from '../schema';
import { createSlug } from '../utils';
import { eq, desc, and } from 'drizzle-orm';

export const categoriesRouter = router({
  // Get all categories
  getAll: publicProcedure
    .query(async () => {
      return await db
        .select({
          id: categories.id,
          name: categories.name,
          description: categories.description,
          slug: categories.slug,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        })
        .from(categories)
        .orderBy(desc(categories.createdAt));
    }),

  // Get user's own categories (for authenticated users) - Temporarily disabled until migration
  // getMy: protectedProcedure
  //   .query(async ({ ctx }) => {
  //     return await db
  //       .select()
  //       .from(categories)
  //       .where(eq(categories.authorId, (ctx.user as any).id))
  //       .orderBy(desc(categories.createdAt));
  //   }),

  // Get category by slug
  getBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, input))
        .limit(1);
      
      if (result.length === 0) {
        throw new Error('Category not found');
      }
      
      return result[0];
    }),

  // Get category by ID
  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(categories)
        .where(eq(categories.id, input))
        .limit(1);
      
      if (result.length === 0) {
        throw new Error('Category not found');
      }
      
      return result[0];
    }),

  // Create category - Temporarily using publicProcedure until migration
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const slug = createSlug(input.name);
      
      // Check if slug already exists
      const existingCategory = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, slug))
        .limit(1);
      
      let finalSlug = slug;
      if (existingCategory.length > 0) {
        finalSlug = `${slug}-${Date.now()}`;
      }

      const [newCategory] = await db
        .insert(categories)
        .values({
          name: input.name,
          description: input.description,
          slug: finalSlug,
          // authorId will be added after migration
          updatedAt: new Date(),
        })
        .returning();

      return newCategory;
    }),

  // Update category - Temporarily using publicProcedure until migration
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1, 'Name is required').optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      
      // If name is being updated, update slug too
      if (updateData.name) {
        const newSlug = createSlug(updateData.name);
        
        // Check if slug already exists (excluding current category)
        const existingWithSlug = await db
          .select()
          .from(categories)
          .where(and(eq(categories.slug, newSlug), eq(categories.id, id)))
          .limit(1);
        
        if (existingWithSlug.length === 0) {
          const slugExists = await db
            .select()
            .from(categories)
            .where(eq(categories.slug, newSlug))
            .limit(1);
          
          if (slugExists.length > 0) {
            (updateData as any).slug = `${newSlug}-${Date.now()}`;
          } else {
            (updateData as any).slug = newSlug;
          }
        }
      }

      const [updatedCategory] = await db
        .update(categories)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(categories.id, id))
        .returning();

      return updatedCategory;
    }),

  // Delete category - Temporarily using publicProcedure until migration
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const [deletedCategory] = await db
        .delete(categories)
        .where(eq(categories.id, input))
        .returning();

      if (!deletedCategory) {
        throw new Error('Category not found');
      }

      return deletedCategory;
    }),

  // Get posts in category
  getPosts: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          slug: posts.slug,
          published: posts.published,
          authorId: posts.authorId,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
        })
        .from(postCategories)
        .innerJoin(posts, eq(postCategories.postId, posts.id))
        .where(eq(postCategories.categoryId, input))
        .orderBy(desc(posts.createdAt));
      
      return result;
    }),
});