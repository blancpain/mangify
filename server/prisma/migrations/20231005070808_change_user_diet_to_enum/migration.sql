/*
  Warnings:

  - The `diet` column on the `profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('ANYTHING', 'VEGETARIAN', 'VEGAN', 'KETOGENIC', 'PALEO', 'PESCETARIAN');

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "diet",
ADD COLUMN     "diet" "Diet";

-- CreateIndex
CREATE INDEX "profile_diet_sex_activity_level_goal_height_weight_idx" ON "profile"("diet", "sex", "activity_level", "goal", "height", "weight");
