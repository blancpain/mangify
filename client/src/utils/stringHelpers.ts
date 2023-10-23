export function capitalizeFirstLetterOfArray(arr: string[]): string[] {
  return arr.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
}

export function capitalizeFirstLetterOfString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// NOTE: finds the first value that matches the array of strings - any meal should have
// at least one of these values since we specifically requested them from the API
export function extractSingleMealType(arr: string[]): string {
  const mealType = arr.find((str) => ['Breakfast', 'Snack'].some((value) => str.includes(value)));
  if (mealType) {
    return mealType;
  }
  return 'Main course';
}

// NOTE: some meal titles are all capital letters and we need to normalize them
export function covertStringToTitleCase(str: string): string {
  if (str === str.toUpperCase()) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return str;
}
