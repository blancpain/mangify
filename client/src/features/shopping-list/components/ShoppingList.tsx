import { useLocalStorage } from 'usehooks-ts';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Avatar, Box, Container, ActionIcon, Flex, List, Text, Title } from '@mantine/core';
import { IconCircleX, IconShoppingCart } from '@tabler/icons-react';
import { ShoppingListItem } from '@/types';
import { capitalizeFirstLetterOfString } from '@/utils';
import { emptyIngredientImage } from '@/assets';
import {
  removeItemFromShoppingList,
  removeSingleIngredientFromShoppingList,
} from '@/utils/shoppingList';

export function ShoppingList() {
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingListItem[]>('shoppingList', []);

  useEffect(() => {
    if (shoppingList && shoppingList.some((item) => item.ingredients.length === 0)) {
      setShoppingList(shoppingList.filter((item) => item.ingredients.length > 0));
    }
  }, [shoppingList, setShoppingList]);

  const handleRemoveIngredient = (e: React.MouseEvent) => {
    const ingredientId = e.currentTarget.getAttribute('data-ingredient');
    const meal = e.currentTarget.getAttribute('data-meal');
    if (!meal || !ingredientId || !shoppingList) return;

    const convertedIngredientId = parseInt(ingredientId, 10);
    const updatedShoppingList = removeSingleIngredientFromShoppingList(
      shoppingList,
      meal,
      convertedIngredientId,
    );
    setShoppingList(updatedShoppingList);
  };

  const handleRemoveMeal = (e: React.MouseEvent) => {
    const meal = e.currentTarget.getAttribute('data-meal');
    if (!meal || !shoppingList) return;

    const updatedShoppingList = removeItemFromShoppingList(shoppingList, meal);
    setShoppingList(updatedShoppingList);
  };

  const shoppingListItems = shoppingList?.map((item) => (
    <Box key={nanoid()} mb={55}>
      <Flex gap={15}>
        <Title order={2} mb={10}>
          {item.meal}
        </Title>
        <ActionIcon
          color="red"
          variant="transparent"
          data-meal={item.meal}
          onClick={handleRemoveMeal}
        >
          <IconCircleX />
        </ActionIcon>
      </Flex>
      <List type="unordered" sx={{ listStyleType: 'none' }}>
        {item.ingredients.map((ingredient) => (
          <Flex gap={15} key={nanoid()} mb={15} align="center">
            <Flex align="center" gap={15}>
              <ActionIcon
                color="red"
                variant="transparent"
                data-meal={item.meal}
                data-ingredient={ingredient.id}
                onClick={handleRemoveIngredient}
              >
                <IconCircleX />
              </ActionIcon>
              <Avatar
                src={
                  ingredient.ingredientImage
                    ? `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.ingredientImage}`
                    : emptyIngredientImage
                }
                radius="xl"
                size="lg"
              />
              <Text>
                {ingredient.ingredient ? capitalizeFirstLetterOfString(ingredient.ingredient) : ''}
              </Text>
              <Text>
                {ingredient.amount ? ingredient.amount : ''}{' '}
                {ingredient.unit ? ingredient.unit : ''}
              </Text>
            </Flex>
          </Flex>
        ))}
      </List>
    </Box>
  ));

  return shoppingList.length === 0 ? (
    <Flex
      direction="column"
      align="center"
      justify="space-around"
      gap="md"
      sx={{ minHeight: '100vh' }}
    >
      <Title order={1} color="dimmed" sx={{ textAlign: 'center' }}>
        Your shopping list is empty
      </Title>
      <IconShoppingCart size={250} color="#5C5F66" />
    </Flex>
  ) : (
    <Container ml={50} mr={50}>
      {shoppingListItems}
    </Container>
  );
}
