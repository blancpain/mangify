/* eslint-disable react/no-unescaped-entities */
import { Blockquote, Container, Flex } from '@mantine/core';

export function About() {
  return (
    <Flex direction="column" align="center" sx={{ minHeight: '100vh' }}>
      <Blockquote color="teal" cite="– No mangify user ever" mt={50} ff="Lato, sans-serif" fz="xl">
        I have no idea what I am going to eat today...
      </Blockquote>
      <Container mt={50} p={40} ff="Avenir, Lato, sans-serif" fz="xl" lh={1.8}>
        <p>
          At mangify, we believe that life is meant to be savored, and every meal should be a
          delightful experience. We're here to help you take control of your eating habits, so you
          can spend more time on what you truly love doing. Our journey began with the desire to
          simplify and enhance the way you plan your meals.
        </p>

        <p>
          We understand that in today's fast-paced world, it can be challenging to make healthy
          choices and still enjoy delicious, home-cooked meals. That's why we've created an app that
          empowers you to take charge of your diet, without sacrificing the joy of eating.
        </p>

        <p>
          With mangify, you can effortlessly plan your weekly meals, discover new recipes, and
          organize your grocery shopping. Say goodbye to the stress of wondering "What's for
          dinner?" or feeling guilty about your food choices. We're here to make meal planning a
          breeze, so you can focus on the activities and passions that bring you happiness. Join us
          on a journey to healthier, more enjoyable eating. Let's make every meal a moment to savor,
          so you can spend more time on what truly matters to you. Welcome to mangify – where your
          food journey begins!
        </p>
      </Container>
    </Flex>
  );
}
