import { Title, Space, Flex, Radio, MultiSelect } from '@mantine/core';
import { Diet } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUser, setDiet, setIntolerances } from '@/stores';
import { useSetDietMutation, useSetIntolerancesMutation } from '@/features/api';

export function DietPreferences() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(selectUser);
  const [setUserDiet] = useSetDietMutation();
  const [setUserIntolerances] = useSetIntolerancesMutation();

  const handleDietInput = async (val: Diet) => {
    dispatch(setDiet(val));
    await setUserDiet({ diet: val });
  };

  const handleIntolerancesInput = async (val: string[]) => {
    dispatch(setIntolerances(val));
    await setUserIntolerances({ intolerances: val });
  };

  return (
    <>
      <Title order={1}>Diet Preferences</Title>
      <Space h="xl" />
      <Space h="xl" />
      <Flex direction="column" gap="lg">
        <Title order={4}>Diet</Title>
        <Radio.Group
          size="md"
          value={profile.diet ? profile.diet : ''}
          onChange={handleDietInput}
          name="preferredDiet"
        >
          <Radio color="teal" m="md" value={Diet.ANYTHING} label="Anything - No restrictions." />
          <Radio
            color="teal"
            m="md"
            value={Diet.VEGETARIAN}
            label="Vegeratian - No meat or meat by-products."
          />
          <Radio color="teal" m="md" value={Diet.VEGAN} label="Vegan - No animal products." />
          <Radio
            color="teal"
            m="md"
            value={Diet.KETOGENIC}
            label="Ketogenic - High fat, very low carbs."
          />
          <Radio
            m="md"
            value={Diet.PALEO}
            color="teal"
            label="Paleo - Emphasizes whole foods, like those of our Paleolithic ancestors."
          />
          <Radio
            m="md"
            color="teal"
            value={Diet.PESCETARIAN}
            label="Pescetarian - No meat, but seafood is allowed."
          />
        </Radio.Group>
        <Title order={4}>Intolerances</Title>
        <MultiSelect
          placeholder="Your intolerances"
          value={profile.intolerances ? profile.intolerances : []}
          searchable
          clearable
          dropdownPosition="top"
          radius="lg"
          size="md"
          p="lg"
          onChange={handleIntolerancesInput}
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
    </>
  );
}
