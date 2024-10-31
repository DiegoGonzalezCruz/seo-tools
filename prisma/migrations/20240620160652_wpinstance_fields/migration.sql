-- Step 1: Add the column with a temporary default value
ALTER TABLE "WordPressInstance" ADD COLUMN "appUsername" TEXT NOT NULL DEFAULT 'default_value';

-- Step 2: Update the existing rows with an appropriate value for appUsername
-- For example, you can set it based on some logic or simply update with a meaningful default
UPDATE "WordPressInstance" SET "appUsername" = 'default_value' WHERE "appUsername" IS NULL;

-- Step 3: Remove the default value (if not needed for future rows)
ALTER TABLE "WordPressInstance" ALTER COLUMN "appUsername" DROP DEFAULT;
