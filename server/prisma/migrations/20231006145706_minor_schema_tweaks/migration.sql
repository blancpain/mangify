/*
  Warnings:

  - The `external_id` column on the `ingredients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recipe_external_id` column on the `meals` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `external_id` on the `recipes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "external_id",
ADD COLUMN     "external_id" INTEGER;

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "recipe_external_id",
ADD COLUMN     "recipe_external_id" INTEGER;

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "external_id",
ADD COLUMN     "external_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_external_id_key" ON "ingredients"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "meals_recipe_external_id_key" ON "meals"("recipe_external_id");
