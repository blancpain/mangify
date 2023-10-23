/*
  Warnings:

  - You are about to drop the `_RecipesAvoidedBy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipesLikedBy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RecipesAvoidedBy" DROP CONSTRAINT "_RecipesAvoidedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesAvoidedBy" DROP CONSTRAINT "_RecipesAvoidedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesLikedBy" DROP CONSTRAINT "_RecipesLikedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesLikedBy" DROP CONSTRAINT "_RecipesLikedBy_B_fkey";

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "favorite_recipes" INTEGER[],
ADD COLUMN     "recipes_to_avoid" INTEGER[];

-- DropTable
DROP TABLE "_RecipesAvoidedBy";

-- DropTable
DROP TABLE "_RecipesLikedBy";

-- DropTable
DROP TABLE "recipes";
