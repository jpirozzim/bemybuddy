export type BuddyCategory = 'fitness' | 'cooking' | 'coding';

export type OnboardingForm = {
  goal: string;
  level: string;
  time: string;
  equipment: string;
  condition: string;
  personality: string[];
};

export type BuddyMemory = {
  id: number;
  type: string;
  content: string;
};
