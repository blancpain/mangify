import { Flex, Text } from '@mantine/core';

export function UnderConstruction() {
  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
      <Text size="xl" align="center">
        Mangify is currently under maintenance. We will be back soon!
      </Text>
    </Flex>
  );
}
