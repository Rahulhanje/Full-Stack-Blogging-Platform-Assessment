import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db } from '../db';
import { posts, postCategories, categories } from '../schema';
import { createSlug } from '../utils';
import { eq, desc, and } from 'drizzle-orm';

export const postsRouter = router({
  // Get all posts
  getAll: publicProcedure
    .input(z.object({
      published: z.boolean().optional(),
      categoryId: z.number().optional(),
    }).optional())
    .query(async ({ input }) => {
      const conditions = [];
      
      if (input?.published !== undefined) {
        conditions.push(eq(posts.published, input.published));
      }

      if (input?.categoryId) {
        // Join with postCategories to filter by category
        const postsWithCategory = await db
          .select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            slug: posts.slug,
            published: posts.published,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
          })
          .from(posts)
          .innerJoin(postCategories, eq(posts.id, postCategories.postId))
          .where(and(
            eq(postCategories.categoryId, input.categoryId),
            ...conditions
          ))
          .orderBy(desc(posts.createdAt));
        
        return postsWithCategory;
      }

      // Regular query without category filter
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      
      return await db
        .select()
        .from(posts)
        .where(whereClause)
        .orderBy(desc(posts.createdAt));
    }),

  // Get post by slug
  getBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, input))
        .limit(1);
      
      if (result.length === 0) {
        throw new Error('Post not found');
      }
      
      return result[0];
    }),

  // Get post by ID
  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(posts)
        .where(eq(posts.id, input))
        .limit(1);
      
      if (result.length === 0) {
        throw new Error('Post not found');
      }
      
      return result[0];
    }),

  // Create post
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1, 'Title is required'),
      content: z.string().min(1, 'Content is required'),
      published: z.boolean().default(false),
      categoryIds: z.array(z.number()).optional(),
    }))
    .mutation(async ({ input }) => {
      const slug = createSlug(input.title);
      
      // Check if slug already exists
      const existingPost = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);
      
      let finalSlug = slug;
      if (existingPost.length > 0) {
        finalSlug = `${slug}-${Date.now()}`;
      }

      const [newPost] = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug: finalSlug,
          published: input.published,
          updatedAt: new Date(),
        })
        .returning();

      // Add categories if provided
      if (input.categoryIds && input.categoryIds.length > 0) {
        await db
          .insert(postCategories)
          .values(
            input.categoryIds.map(categoryId => ({
              postId: newPost.id,
              categoryId,
            }))
          );
      }

      return newPost;
    }),

  // Update post
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1, 'Title is required').optional(),
      content: z.string().min(1, 'Content is required').optional(),
      published: z.boolean().optional(),
      categoryIds: z.array(z.number()).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, categoryIds, ...updateData } = input;
      
      // If title is being updated, update slug too
      if (updateData.title) {
        const newSlug = createSlug(updateData.title);
        
        // Check if slug already exists (excluding current post)
        const existingPost = await db
          .select()
          .from(posts)
          .where(and(eq(posts.slug, newSlug), eq(posts.id, id)))
          .limit(1);
        
        if (existingPost.length === 0) {
          const slugExists = await db
            .select()
            .from(posts)
            .where(eq(posts.slug, newSlug))
            .limit(1);
          
          if (slugExists.length > 0) {
            (updateData as any).slug = `${newSlug}-${Date.now()}`;
          } else {
            (updateData as any).slug = newSlug;
          }
        }
      }

      const [updatedPost] = await db
        .update(posts)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, id))
        .returning();

      // Update categories if provided
      if (categoryIds !== undefined) {
        // Remove existing categories
        await db
          .delete(postCategories)
          .where(eq(postCategories.postId, id));

        // Add new categories
        if (categoryIds.length > 0) {
          await db
            .insert(postCategories)
            .values(
              categoryIds.map(categoryId => ({
                postId: id,
                categoryId,
              }))
            );
        }
      }

      return updatedPost;
    }),

  // Delete post
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const [deletedPost] = await db
        .delete(posts)
        .where(eq(posts.id, input))
        .returning();

      if (!deletedPost) {
        throw new Error('Post not found');
      }

      return deletedPost;
    }),

  // Get post categories
  getCategories: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: categories.id,
          name: categories.name,
          description: categories.description,
          slug: categories.slug,
        })
        .from(postCategories)
        .innerJoin(categories, eq(postCategories.categoryId, categories.id))
        .where(eq(postCategories.postId, input));
      
      return result;
    }),
});