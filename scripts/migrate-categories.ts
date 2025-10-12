import dotenv from 'dotenv';

// Load environment variables first
dotenv.config({ path: '.env.local' });

import { db } from '../lib/db';

async function addAuthorToCategories() {
  try {
    console.log('Adding author_id column to categories table...');
    
    // Check if column already exists
    const tableInfo = await db.execute(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'categories' AND column_name = 'author_id'
    `);
    
    if (tableInfo.rows.length > 0) {
      console.log('author_id column already exists!');
      return;
    }
    
    // Add column with default value
    await db.execute(`
      ALTER TABLE "categories" 
      ADD COLUMN "author_id" integer NOT NULL DEFAULT 1
    `);
    
    // Update to use the first user's ID
    await db.execute(`
      UPDATE "categories" 
      SET "author_id" = (SELECT id FROM users ORDER BY id LIMIT 1)
    `);
    
    // Add foreign key constraint
    await db.execute(`
      ALTER TABLE "categories" 
      ADD CONSTRAINT "categories_author_id_users_id_fk" 
      FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") 
      ON DELETE cascade ON UPDATE no action
    `);
    
    console.log('Successfully added author_id column to categories table!');
  } catch (error) {
    console.error('Error:', error);
  }
}

addAuthorToCategories();