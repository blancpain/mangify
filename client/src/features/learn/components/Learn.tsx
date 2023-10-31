import { useState } from 'react';
import { Stepper, Flex } from '@mantine/core';
import { CustomPopover } from '@/components';

export function Learn() {
  const [active, setActive] = useState(0);

  return (
    <Flex align="center" justify="center" m={50}>
      <Stepper
        active={active}
        onStepClick={setActive}
        orientation="vertical"
        color="teal"
        size="lg"
      >
        <Stepper.Step
          label="Step 1"
          description={
            <CustomPopover
              buttonText="Create an account"
              dropdownText="It's easy as 1, 2, 3! We only need your name and email to get you started."
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label="Step 2"
          description={
            <CustomPopover
              buttonText="Complete your user profile and set your preferences"
              dropdownText="We ask for your physical attributes, activity level, goals and diet preferences."
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label="Step 3"
          description={
            <CustomPopover
              buttonText="Find out your daily nutrition targets"
              dropdownText="Your daily nutrition targets are automatically calculated based on your profile and preferences."
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label="Step 3"
          description={
            <CustomPopover
              buttonText="Generate some meals and start using Mangify!"
              dropdownText="Enjoy your meal plan!"
            />
          }
          sx={{ paddingBottom: '100px' }}
        />
      </Stepper>
    </Flex>
  );
}
