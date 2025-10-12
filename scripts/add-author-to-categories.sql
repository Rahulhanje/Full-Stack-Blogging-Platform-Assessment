-- Add authorId column to categories table
ALTER TABLE "categories" ADD COLUMN "author_id" integer NOT NULL DEFAULT 1;

-- Add foreign key constraint
ALTER TABLE "categories" ADD CONSTRAINT "categories_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

-- Update existing categories to have a valid author_id (set to first user)
UPDATE "categories" SET "author_id" = (SELECT id FROM users ORDER BY id LIMIT 1) WHERE "author_id" = 1;