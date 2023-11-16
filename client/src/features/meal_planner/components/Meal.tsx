import { Group, Avatar, Text, Grid, Badge, Modal, Flex, Image, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { nanoid } from '@reduxjs/toolkit';
import { IconCheck, IconShoppingCartPlus } from '@tabler/icons-react';
import { FullNutritionProfile, MealIngredients } from 'mangify-shared-types';
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

      notifications.show({
        id: 'add-to-shopping-list',
        title: 'Items added to shopping list!',
        icon: <IconCheck size="1rem" />,
        color: 'teal',
        message: '',
        autoClose: 2000,
        withCloseButton: false,
      });
    }
  };

  const calories = nutritionProfile?.calories?.toFixed(0);
  const protein = nutritionProfile?.protein?.toFixed(1);
  const carbs = nutritionProfile?.carbs?.toFixed(1);
  const fats = nutritionProfile?.fats?.toFixed(1);

  return (
    <Group>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={
          <Flex direction="column" align="start" gap={20}>
            <Text size="xl" fw="bold" pl={20}>
              {label}
            </Text>
            <Group ml={20}>
              <Badge color="teal">Calories: {calories}</Badge>
              <Badge color="grape">Protein: {protein}</Badge>
              <Badge color="indigo">Carbs: {carbs}</Badge>
              <Badge color="yellow">Fats: {fats}</Badge>
            </Group>
          </Flex>
        }
      >
        <Grid pl={{ base: 5, md: 20 }} pr={{ base: 5, md: 20 }} pt={10}>
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
              size="xs"
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

      <Flex gap={30}>
        <Group position="center">
          {image ? (
            <Avatar onClick={open} src={image} radius="xl" size="lg" sx={{ cursor: 'pointer' }} />
          ) : (
            <Image
              onClick={open}
              src={emptyMealImage}
              radius="lg"
              maw={60}
              sx={{ cursor: 'pointer' }}
            />
          )}
        </Group>
        <Flex direction="column" align="start">
          <Text fw={600} onClick={open} style={{ cursor: 'pointer' }}>
            {covertStringToTitleCase(label)}
          </Text>
          <Text size="sm" color="dimmed" weight={400} onClick={open} style={{ cursor: 'pointer' }}>
            {description}
          </Text>
        </Flex>
      </Flex>
    </Group>
  );
}
