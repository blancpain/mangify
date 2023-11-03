import { Popover, Text } from '@mantine/core';
import { motion } from 'framer-motion';

type PopoverProps = {
  buttonText: string;
  dropdownText: string;
};

export function CustomPopover({ buttonText, dropdownText }: PopoverProps) {
  return (
    <Popover width={300} position="bottom" shadow="xl">
      <Popover.Target>
        <motion.div whileHover={{ scale: 0.95 }}>
          <Text size="xl" italic>
            {buttonText}
          </Text>
        </motion.div>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="md">{dropdownText}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
