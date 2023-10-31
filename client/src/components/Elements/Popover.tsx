import { Popover, Text } from '@mantine/core';

type PopoverProps = {
  buttonText: string;
  dropdownText: string;
};

export function CustomPopover({ buttonText, dropdownText }: PopoverProps) {
  return (
    <Popover width={300} position="bottom" shadow="md">
      <Popover.Target>
        <Text color="teal" underline size="md" fw={600}>
          {buttonText}
        </Text>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="md">{dropdownText}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
