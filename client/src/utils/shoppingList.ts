import { ShoppingListItem } from '@/types';

export const addItemToShoppingList = (
  currentState: ShoppingListItem[],
  newItem: ShoppingListItem,
): ShoppingListItem[] => {
  if (!currentState.map((item) => item.meal).includes(newItem.meal)) {
    return [...currentState, newItem];
  }
  return currentState;
};

export const removeItemFromShoppingList = (
  currentState: ShoppingListItem[],
  meal: string,
): ShoppingListItem[] => currentState.filter((item) => item.meal !== meal);

export const removeSingleIngredientFromShoppingList = (
  currentState: ShoppingListItem[],
  meal: string,
  ingredientId: number,
): ShoppingListItem[] => {
  if (currentState.map((item) => item.meal).includes(meal)) {
    return currentState.map((item) =>
      item.meal === meal
        ? {
            ...item,
            ingredients: [
              ...item.ingredients.filter(
                (currentIngredient) => currentIngredient.id !== ingredientId,
              ),
            ],
          }
        : item,
    );
  }
  return currentState;
};

// NOTE: for future ref, we used to have a shoppingList slice but not needed at the moment

// const shoppingListSlice = createSlice({
//   name: 'shoppingList',
//   initialState,
//   reducers: {
//     setShoppingList(state, action: PayloadAction<ShoppingListItem[]>) {
//       state.shoppingList = action.payload;
//     },
//     addItemsToShoppingList: (
//       state,
//       action: PayloadAction<{ meal: string; ingredient: MealIngredients }>,
//     ) => {
//       if (state.shoppingList.map((item) => item.meal).includes(action.payload.meal)) {
//         state.shoppingList = state.shoppingList.map((item) =>
//           item.meal === action.payload.meal
//             ? { ...item, ingredients: [...item.ingredients, action.payload.ingredient] }
//             : item,
//         );
//       } else {
//         state.shoppingList = [
//           ...state.shoppingList,
//           { meal: action.payload.meal, ingredients: [action.payload.ingredient] },
//         ];
//       }
//     },
//     removeItemsFromShoppingList: (
//       state,
//       action: PayloadAction<{ meal: string; ingredientId: number }>,
//     ) => {
//       if (state.shoppingList.map((item) => item.meal).includes(action.payload.meal)) {
//         state.shoppingList = state.shoppingList.map((item) =>
//           item.meal === action.payload.meal
//             ? {
//                 ...item,
//                 ingredients: [
//                   ...item.ingredients.filter(
//                     (currentIngredient) => currentIngredient.id !== action.payload.ingredientId,
//                   ),
//                 ],
//               }
//             : item,
//         );
//       }
//     },
//     removeAllIngredientsOfMealFromShoppingList: (state, action: PayloadAction<string>) => {
//       state.shoppingList = state.shoppingList.filter((item) => item.meal !== action.payload);
//     },
//     addAllIngredientsOfMealToShoppingList: (state, action: PayloadAction<ShoppingListItem>) => {
//       // all all meal ingredients to shopping list, no duplicates allowed
//       if (!state.shoppingList.map((item) => item.meal).includes(action.payload.meal)) {
//         state.shoppingList = [...state.shoppingList, action.payload];
//       }
//     },
//     removeEntireMealFromShoppingList: (state, action: PayloadAction<string>) => {
//       state.shoppingList = state.shoppingList.filter((item) => item.meal !== action.payload);
//     },
//     emptyShoppingList: (state) => {
//       state.shoppingList = [];
//     },
//   },
// });
//
