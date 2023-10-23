-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "day" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "calories" INTEGER,
ADD COLUMN     "carbs" INTEGER,
ADD COLUMN     "fats" INTEGER,
ADD COLUMN     "protein" INTEGER,
ALTER COLUMN "activity_level" DROP NOT NULL,
ALTER COLUMN "intolerances" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "favorite_cuisines" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "favorite_recipes" SET DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "recipes_to_avoid" SET DEFAULT ARRAY[]::INTEGER[];
