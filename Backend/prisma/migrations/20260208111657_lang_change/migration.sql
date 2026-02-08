/*
  Warnings:

  - The values [cpp,python] on the enum `LANGUAGE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LANGUAGE_new" AS ENUM ('java', 'javascript', 'CPP', 'C');
ALTER TABLE "submission" ALTER COLUMN "language" TYPE "LANGUAGE_new" USING ("language"::text::"LANGUAGE_new");
ALTER TYPE "LANGUAGE" RENAME TO "LANGUAGE_old";
ALTER TYPE "LANGUAGE_new" RENAME TO "LANGUAGE";
DROP TYPE "public"."LANGUAGE_old";
COMMIT;
