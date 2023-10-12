import { UserProfileForClient, NonNullableUserProfileForClient } from '@shared/types';

export const parseUserSettings = (
  profile: UserProfileForClient,
): NonNullableUserProfileForClient | null => {
  if (
    profile.age &&
    profile.sex &&
    profile.diet &&
    profile.height &&
    profile.weight &&
    profile.activity_level &&
    profile.goal
  ) {
    return {
      age: profile.age,
      activity_level: profile.activity_level,
      goal: profile.goal,
      height: profile.height,
      weight: profile.weight,
      sex: profile.sex,
    };
  }
  return null;
};
