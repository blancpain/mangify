/*
  Warnings:

  - You are about to drop the column `recipes_to_avoid` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unique_identifier]` on the table `meals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "unique_identifier" TEXT,
ALTER COLUMN "day" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "recipes_to_avoid";

-- CreateIndex
CREATE UNIQUE INDEX "meals_unique_identifier_key" ON "meals"("unique_identifier");
