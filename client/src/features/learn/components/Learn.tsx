import { useState } from 'react';
import { Stepper, Flex, Text, Title } from '@mantine/core';
import { CustomPopover } from '@/components';

export function Learn() {
  const [active, setActive] = useState(0);

  return (
    <Flex
      align="center"
      gap={50}
      sx={{ minHeight: '100vh' }}
      mt={50}
      ml={30}
      mr={30}
      direction="column"
    >
      <Title order={1} align="center">
        Follow the steps below to become a mangify expert in no time!
      </Title>
      <Stepper active={active} onStepClick={setActive} m={40} orientation="vertical" color="teal">
        <Stepper.Step
          label={<Text size={35}>Step 1</Text>}
          description={
            <CustomPopover
              buttonText="Create an account"
              dropdownText="It's easy as 1, 2, 3! We only need your name and email to get you started."
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label={<Text size={35}>Step 2</Text>}
          description={
            <CustomPopover
              buttonText="Complete your user profile and set your preferences"
              dropdownText="We ask for your physical attributes, activity level, goals and diet preferences."
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label={<Text size={35}>Step 3</Text>}
          description={
            <CustomPopover
              buttonText="Find out your daily nutrition targets"
              dropdownText="Your daily nutrition targets are automatically calculated based on your profile and preferences."
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label={<Text size={35}>Step 4</Text>}
          description={
            <CustomPopover
              buttonText="Generate some meals and start using Mangify!"
              dropdownText="With a single click you can generate up to a week's worth of meals. Enjoy your meal plan!"
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
      </Stepper>
    </Flex>
  );
}
