/*
  Warnings:

  - You are about to drop the column `foodId` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the `_MealsToRecipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `external_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_external_id` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MealsToRecipes" DROP CONSTRAINT "_MealsToRecipes_A_fkey";

-- DropForeignKey
ALTER TABLE "_MealsToRecipes" DROP CONSTRAINT "_MealsToRecipes_B_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "foodId",
ADD COLUMN     "external_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "recipe_external_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_MealsToRecipes";
