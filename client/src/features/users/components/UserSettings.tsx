import { Title, Select, Space, Flex, NumberInput, Group, Text, Button } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  setSex,
  selectUser,
  setHeight,
  setWeight,
  setAge,
  setActivityLevel,
  setGoal,
  setNutritionProfile,
} from '@/stores';
import { ActivityLevel, Sex, Goal } from '@/types';
import { isNumber, calculateDailyIntake, calculateMacros, parseUserSettings } from '@/utils';

export function UserSettings() {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector(selectUser);

  const handleHeightInput = (val: unknown) => {
    if (isNumber(val)) {
      dispatch(setHeight(val));
    }
  };
  const handleWeightInput = (val: unknown) => {
    if (isNumber(val)) {
      dispatch(setWeight(val));
    }
  };
  const handleAgeInput = (val: unknown) => {
    if (isNumber(val)) {
      dispatch(setAge(val));
    }
  };

  const saveSettings = () => {
    const userSettings = parseUserSettings(settings);

    if (userSettings) {
      const totalCalories = calculateDailyIntake(userSettings);
      if (totalCalories) {
        const macros = calculateMacros(userSettings.weight, totalCalories);
        const finalNutritionProfile = {
          calories: Math.trunc(totalCalories),
          macros,
        };
        dispatch(setNutritionProfile(finalNutritionProfile));
      }
    }
  };

  return (
    <>
      <Title order={1}>General settings</Title>
      <Space h="xl" />
      <Space h="xl" />
      <Flex direction="column">
        <Title order={4} mb="md">
          Sex
        </Title>
        <Select
          w="40%"
          value={settings.sex?.toString()}
          placeholder="Your sex"
          onChange={(val) => dispatch(setSex(val as Sex))}
          data={[
            { value: Sex.MALE, label: 'Male' },
            { value: Sex.FEMALE, label: 'Female' },
          ]}
        />
        <Title order={4} mb="md" mt="md">
          Age
        </Title>
        <Group>
          <NumberInput
            w="40%"
            value={settings.age}
            onChange={handleAgeInput}
            min={1}
            max={150}
            placeholder="Your age"
          />
        </Group>
        <Title order={4} mb="md" mt="md">
          Height
        </Title>
        <Group>
          <NumberInput
            w="40%"
            value={settings.height}
            onChange={handleHeightInput}
            min={10}
            max={300}
            placeholder="Your height"
          />
          <Text>cm</Text>
        </Group>
        <Title order={4} mb="md" mt="md">
          Weight
        </Title>
        <Group>
          <NumberInput
            w="40%"
            value={settings.weight}
            onChange={handleWeightInput}
            min={1}
            max={1000}
            placeholder="Your weight"
          />
          <Text>kg</Text>
        </Group>
        <Title order={4} mb="md" mt="md">
          Activity Level
        </Title>
        <Select
          w="40%"
          value={settings.activity?.toString()}
          placeholder="Your activity level"
          onChange={(val) => dispatch(setActivityLevel(Number(val)))}
          data={[
            { value: ActivityLevel.Sedentary.toString(), label: 'Sedentary' },
            { value: ActivityLevel.Light.toString(), label: 'Light' },
            { value: ActivityLevel.Moderate.toString(), label: 'Moderate' },
            { value: ActivityLevel.VeryActive.toString(), label: 'Active' },
          ]}
        />
        <Title order={4} mb="md" mt="md">
          What is your goal?
        </Title>
        <Select
          w="40%"
          value={settings.goal?.toString()}
          placeholder="Your goal"
          onChange={(val) => dispatch(setGoal(Number(val)))}
          data={[
            { value: Goal.loseWeight.toString(), label: 'Lose weight' },
            { value: Goal.maintain.toString(), label: 'Maintain' },
            { value: Goal.gainWeight.toString(), label: 'Gain weight' },
          ]}
        />
        <Button onClick={saveSettings} variant="outline" color="teal" mt="md">
          Save
        </Button>
      </Flex>
    </>
  );
}
