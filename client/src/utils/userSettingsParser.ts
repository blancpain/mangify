import { UserSettings, UserSettingsComplete } from '@/types';

export const parseUserSettings = (settings: UserSettings): UserSettingsComplete | null => {
  if (
    typeof settings.sex !== 'undefined' &&
    typeof settings.age !== 'undefined' &&
    typeof settings.weight !== 'undefined' &&
    typeof settings.height !== 'undefined' &&
    typeof settings.activity !== 'undefined' &&
    typeof settings.goal !== 'undefined'
  ) {
    return {
      age: settings.age,
      activity: settings.activity,
      goal: settings.goal,
      height: settings.height,
      weight: settings.weight,
      sex: settings.sex,
    };
  }
  return null;
};
