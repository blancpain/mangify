import { Title, Select, Space, Flex, NumberInput, Group, Text, Button } from '@mantine/core';
import { IconCheck, IconCircleX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { ActivityLevel, Sex, Goal } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  setSex,
  selectUser,
  setHeight,
  setWeight,
  setAge,
  setGoal,
  setActivityLevel,
  setCalories,
  setProtein,
  setFats,
  setCarbs,
} from '@/stores';
import {
  isNumber,
  calculateDailyIntake,
  calculateMacros,
  validateUserSettings,
  allUserSettingsProvided,
} from '@/utils';
import {
  useSetActivityLevelMutation,
  useSetAgeMutation,
  useSetGoalMutation,
  useSetHeightMutation,
  useSetSexMutation,
  useSetWeightMutation,
  useSetCaloriesMutation,
  useSetProteinMutation,
  useSetCarbsMutation,
  useSetFatsMutation,
} from '@/features/api';

export function UserSettings() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(selectUser);
  const [setUserAge] = useSetAgeMutation();
  const [setUserSex] = useSetSexMutation();
  const [setUserActivityLevel] = useSetActivityLevelMutation();
  const [setUserGoal] = useSetGoalMutation();
  const [setUserWeight] = useSetWeightMutation();
  const [setUserHeight] = useSetHeightMutation();
  const [setUserCalories] = useSetCaloriesMutation();
  const [setUserProtein] = useSetProteinMutation();
  const [setUserCarbs] = useSetCarbsMutation();
  const [setUserFats] = useSetFatsMutation();

  // NOTE: might have to do error handling for these in case of DB failure
  const handleHeightInput = async (val: unknown) => {
    if (isNumber(val)) {
      dispatch(setHeight(val));
      await setUserHeight({ height: val });
    }
  };

  const handleWeightInput = async (val: unknown) => {
    if (isNumber(val)) {
      dispatch(setWeight(val));
      await setUserWeight({ weight: val });
    }
  };

  const handleAgeInput = async (val: unknown) => {
    if (isNumber(val)) {
      dispatch(setAge(val));
      await setUserAge({ age: val });
    }
  };

  const handleSexInput = async (val: Sex) => {
    dispatch(setSex(val));
    await setUserSex({ sex: val });
  };

  const handleActivityLevelInput = async (val: ActivityLevel) => {
    dispatch(setActivityLevel(val));
    await setUserActivityLevel({ activity: val });
  };

  const handleGoalInput = async (val: Goal) => {
    dispatch(setGoal(val));
    await setUserGoal({ goal: val });
  };

  // NOTE: user settings are actually saved as the users types them
  // we only include the Save button to sync the user's nutrition profile (macros etc) with the server
  const handleSave = async () => {
    if (allUserSettingsProvided(profile)) {
      const userNumbers = validateUserSettings(profile);

      if (userNumbers) {
        const totalCalories = calculateDailyIntake(userNumbers);
        if (totalCalories) {
          const userMacros = calculateMacros(userNumbers.weight, totalCalories);
          const finalNutritionProfile = {
            calories: Math.trunc(totalCalories),
            macros: userMacros,
          };
          dispatch(setCalories(finalNutritionProfile.calories));
          dispatch(setProtein(finalNutritionProfile.macros.protein));
          dispatch(setCarbs(finalNutritionProfile.macros.carbs));
          dispatch(setFats(finalNutritionProfile.macros.fats));
          await setUserCalories({ calories: finalNutritionProfile.calories });
          await setUserProtein({ protein: finalNutritionProfile.macros.protein });
          await setUserCarbs({ carbs: finalNutritionProfile.macros.carbs });
          await setUserFats({ fats: finalNutritionProfile.macros.fats });
        }
      }

      notifications.show({
        id: 'load-data',
        loading: true,
        title: 'Syncing your nutritinon profile',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });

      setTimeout(() => {
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Profile successfully synced',
          message: '',
          icon: <IconCheck size="1rem" />,
          autoClose: 2000,
        });
      }, 2500);
    } else {
      notifications.show({
        id: 'insufficient-data',
        color: 'red',
        title: 'Please fill in all information',
        message: '',
        icon: <IconCircleX size="1rem" />,
        autoClose: false,
      });
    }
  };

  return (
    <>
      <Title order={1}>User Settings</Title>
      <Space h="xl" />
      <Space h="xl" />
      <Flex direction="column">
        <Title order={4} mb="md">
          Sex
        </Title>
        <Select
          w="245px"
          id="sex"
          value={profile.sex}
          placeholder="Your sex"
          // NOTE: type casting in this and the below enum fields should be OK since we have hardcoded them in the data array using the original type
          onChange={handleSexInput}
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
            w="245px"
            id="age"
            value={profile.age ? profile.age : ''}
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
            id="height"
            w="245px"
            value={profile.height ? profile.height : ''}
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
            id="weight"
            w="245px"
            value={profile.weight ? profile.weight : ''}
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
          w="245px"
          value={profile.activity_level}
          placeholder="Your activity level"
          onChange={handleActivityLevelInput}
          data={[
            { value: ActivityLevel.SEDENTARY, label: 'Sedentary' },
            { value: ActivityLevel.LIGHT, label: 'Light' },
            { value: ActivityLevel.MODERATE, label: 'Moderate' },
            { value: ActivityLevel.VERYACTIVE, label: 'Active' },
          ]}
        />
        <Title order={4} mb="md" mt="md">
          What is your goal?
        </Title>
        <Select
          w="245px"
          value={profile.goal}
          placeholder="Your goal"
          onChange={handleGoalInput}
          data={[
            { value: Goal.LOSEWEIGHT, label: 'Lose weight' },
            { value: Goal.MAINTAIN, label: 'Maintain' },
            { value: Goal.GAINWEIGHT, label: 'Gain weight' },
          ]}
        />
        <Space h="xl" />
        <Button id="sync-profile" color="teal" w="245px" mt="md" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </>
  );
}
