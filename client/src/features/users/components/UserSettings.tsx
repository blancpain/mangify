import { Title, Select, Space, Flex, NumberInput, Group, Text } from '@mantine/core';
import { ActivityLevel, Sex, Goal } from '@shared/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  setSex,
  selectUser,
  setHeight,
  setWeight,
  setAge,
  setGoal,
  setActivityLevel,
} from '@/stores';
import { isNumber } from '@/utils';
import {
  useSetActivityLevelMutation,
  useSetAgeMutation,
  useSetGoalMutation,
  useSetHeightMutation,
  useSetSexMutation,
  useSetWeightMutation,
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

  // TODO: refactor these, lots can be extracted in helper
  // especially the error handling - currently none...
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
            w="40%"
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
            w="40%"
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
            w="40%"
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
          w="40%"
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
          w="40%"
          value={profile.goal}
          placeholder="Your goal"
          onChange={handleGoalInput}
          data={[
            { value: Goal.LOSEWEIGHT, label: 'Lose weight' },
            { value: Goal.MAINTAIN, label: 'Maintain' },
            { value: Goal.GAINWEIGHT, label: 'Gain weight' },
          ]}
        />
      </Flex>
    </>
  );
}
