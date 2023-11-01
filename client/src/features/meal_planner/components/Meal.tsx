import {
  Group,
  Avatar,
  Text,
  Grid,
  Title,
  HoverCard,
  Modal,
  Flex,
  Image,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import { FullNutritionProfile, MealIngredients } from '@shared/types';
import { useLocalStorage } from 'usehooks-ts';
import { ShoppingListItem } from '@/types';
import { capitalizeFirstLetterOfString, covertStringToTitleCase } from '@/utils';
import { emptyMealImage, emptyIngredientImage } from '@/assets';

type MealProps = {
  label: string;
  image: string | null | undefined;
  description: string;
  directions: string[];
  nutritionProfile: FullNutritionProfile | null;
  ingredients: MealIngredients[] | null;
};

export function Meal({
  label,
  image,
  description,
  directions,
  nutritionProfile,
  ingredients,
}: MealProps) {
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingListItem[]>('shoppingList', []);

  const [opened, { open, close }] = useDisclosure(false);
  const mealCookingDirections =
    directions && directions.length > 1
      ? directions.map((step) => <li key={nanoid()}>{step || ''}</li>)
      : 'Just mix all the ingredients and enjoy!';

  const ingredientDetails = ingredients?.map((ingredient) => (
    <Flex gap="md" key={nanoid()} pb={5}>
      <Avatar
        src={
          ingredient.ingredientImage
            ? `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.ingredientImage}`
            : emptyIngredientImage
        }
        radius="xl"
        size="sm"
      />
      <Flex align="center">
        <Text pr={10}>
          {ingredient.ingredient ? capitalizeFirstLetterOfString(ingredient.ingredient) : ''}
        </Text>
        <Text pr={3}>{ingredient.amount ? ingredient.amount : ''}</Text>
        <Text>{ingredient.unit ? ingredient.unit : ''}</Text>
      </Flex>
    </Flex>
  ));

  const handleAddToShoppingList = () => {
    if (ingredients) {
      const shoppingListItem = {
        meal: label,
        ingredients,
      };
      // add in local storage if not already there
      if (shoppingList && !shoppingList.map((item) => item.meal).includes(shoppingListItem.meal)) {
        setShoppingList((prevState) => [...prevState, shoppingListItem]);
      } else if (!shoppingList) {
        setShoppingList((prevState) => [...prevState, shoppingListItem]);
      }
    }
  };

  return (
    <Group>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={
          <Text size="xl" fw="bold" pl={20}>
            {label}
          </Text>
        }
      >
        <Grid pl={20} pr={20} gutter={80}>
          <Grid.Col lg={6} md={9}>
            <Text pb={20} fw="bold">
              Ingredients:
            </Text>
            {ingredientDetails}
            <Button
              leftIcon={<IconShoppingCartPlus />}
              onClick={handleAddToShoppingList}
              mt={20}
              color="teal"
              variant="light"
            >
              Add ingredients to shopping list
            </Button>
          </Grid.Col>
          <Grid.Col lg={6} md={9}>
            <Text fw="bold">Cooking instructions:</Text>
            <ol style={{ padding: '0px' }}>{mealCookingDirections}</ol>
          </Grid.Col>
        </Grid>
      </Modal>

      <HoverCard shadow="md" radius="lg" position="right">
        <HoverCard.Target>
          <Group position="center">
            {image ? (
              <Avatar onClick={open} src={image} radius="xl" size="lg" />
            ) : (
              <Image onClick={open} src={emptyMealImage} radius="lg" maw={60} />
            )}
          </Group>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Title order={5}>Calories:</Title>
          <Text>{nutritionProfile?.calories?.toFixed(0)}</Text>
          <Title order={5}>Macros:</Title>
          <Flex>
            <Text pr={5}>Protein:</Text>
            <Text>{nutritionProfile?.protein?.toFixed(1)} g</Text>
          </Flex>
          <Flex>
            <Text pr={5}>Carbs:</Text>
            <Text>{nutritionProfile?.carbs?.toFixed(1)} g</Text>
          </Flex>
          <Flex>
            <Text pr={5}>Fats:</Text>
            <Text>{nutritionProfile?.fats?.toFixed(1)} g</Text>
          </Flex>
        </HoverCard.Dropdown>
      </HoverCard>
      <div>
        <Text fw={600}>{covertStringToTitleCase(label)}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}
