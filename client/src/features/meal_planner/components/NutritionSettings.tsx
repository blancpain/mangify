import { Title, Space, Flex, Radio, MultiSelect } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectNutritionPreferences, setDiet, setCuisines, setIntolerances } from '@/stores';

export function NutritionSettings() {
  const { diet, cuisines, intolerances, nutritionProfile } = useAppSelector(
    selectNutritionPreferences,
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <Title order={1}>Diet & Nutrition Preferences</Title>
      <Space h="xl" />
      <Space h="xl" />
      <Flex direction="column" gap="lg">
        <Title order={4}>Diet</Title>
        <Radio.Group
          size="md"
          value={diet}
          onChange={(val) => dispatch(setDiet(val))}
          name="preferredDiet"
        >
          <Radio color="teal" m="md" value="" label="Anything - No restrictions." />
          <Radio
            color="teal"
            m="md"
            value="vegetarian"
            label="Vegeratian - No meat or meat by-products."
          />
          <Radio color="teal" m="md" value="vegan" label="Vegan - No animal products." />
          <Radio
            color="teal"
            m="md"
            value="ketogenic"
            label="Ketogenic - High fat, very low carbs."
          />
          <Radio
            m="md"
            value="paleo"
            color="teal"
            label="Paleo - Emphasizes whole foods, like those of our Paleolithic ancestors."
          />
          <Radio
            m="md"
            color="teal"
            value="pescetarian"
            label="Pescetarian - No meat, but seafood is allowed."
          />
        </Radio.Group>
        <Title order={4}>Cuisines</Title>
        <MultiSelect
          placeholder="Select your favorite cuisines or leave blank."
          value={cuisines}
          searchable
          clearable
          dropdownPosition="bottom"
          radius="lg"
          size="lg"
          p="lg"
          onChange={(vals) => dispatch(setCuisines(vals))}
          data={[
            'African',
            'Asian',
            'American',
            'British',
            'Cajun',
            'Caribbean',
            'Chinese',
            'Eastern European',
            'European',
            'French',
            'German',
            'Greek',
            'Indian',
            'Irish',
            'Italian',
            'Japanese',
            'Jewish',
            'Korean',
            'Latin American',
            'Mediterranean',
            'Mexican',
            'Middle Eastern',
            'Nordic',
            'Southern',
            'Spanish',
            'Thai',
            'Vietnamese',
          ]}
        />
        <Title order={4}>Intolerances</Title>
        <MultiSelect
          placeholder="Please add any introlerances you may have or leave blank."
          value={intolerances}
          searchable
          clearable
          dropdownPosition="top"
          radius="lg"
          size="lg"
          p="lg"
          onChange={(vals) => dispatch(setIntolerances(vals))}
          data={[
            'Dairy',
            'Egg',
            'Gluten',
            'Grain',
            'Peanut',
            'Seafood',
            'Sesame',
            'Shellfish',
            'Soy',
            'Sulfite',
            'Tree Nut',
            'Wheat',
          ]}
        />
      </Flex>
      {nutritionProfile && (
        <>
          <p>Total calories: {nutritionProfile.calories}</p>
          <p>Macros</p>
          <p>Carbs: {nutritionProfile.macros.carbs} g</p>
          <p>Protein: {nutritionProfile.macros.protein} g</p>
          <p>Fats: {nutritionProfile.macros.fats} g</p>
        </>
      )}
    </>
  );
}
