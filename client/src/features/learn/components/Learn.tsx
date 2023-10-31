import { useState } from 'react';
import { Stepper, Center } from '@mantine/core';

export function Learn() {
  const [active, setActive] = useState(1);

  return (
    <Center h="100vh">
      <Stepper
        active={active}
        onStepClick={setActive}
        orientation="vertical"
        color="teal"
        size="xl"
      >
        <Stepper.Step
          label="Step 1"
          description="Create an account"
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label="Step 2"
          description="Complete your user profile and preferences"
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label="Step 3"
          description="Find out your daily nutrition targets"
          sx={{ paddingBottom: '100px' }}
        />
        <Stepper.Step
          label="Step 3"
          description="Generate some meals and start using Mangify!"
          sx={{ paddingBottom: '100px' }}
        />
      </Stepper>
    </Center>
  );
}
