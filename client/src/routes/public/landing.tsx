import { Hero, MealGenerator } from '@/features/landing';

export function Landing() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Hero />
      <MealGenerator />
    </main>
  );
}
