export const heights = [
  145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
  160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
  175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
  190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204,
  205, 206, 207, 208, 209, 210,
];

export const weights = [
  35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
  54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
  73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
  92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
  109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
  124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
  139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
];

export const ages = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
  75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
];
export const neck = [
  25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
  44, 45, 46, 47, 48, 49, 50,
];

export const waist = [
  35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
  54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
  73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
  92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
  109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
  124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
  139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
];

export const hip = [
  70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
  107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121,
  122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
  137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
];

export const wrist = [
  10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
  17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5,
  25,
];

// export const bodyTypes = ["Ectomorph", "Mesomorph", "Endomorph"];

export const bodyTypes = [
  {
    sitution: "Overlapping",
    value: "Ectomorph",
  },
  {
    sitution: "Just touching",
    value: "Mesomorph",
  },
  {
    sitution: "Not touching, there is gap between",
    value: "Endomorph",
  },
];

export const activityLevels = [
  {
    sitution: "Sedentary: little or no exercise",
    value: "level_1",
  },
  {
    sitution: "Exercise 1-3 times/week",
    value: "level_2",
  },
  {
    sitution: "Exercise 4-5 times/week",
    value: "level_3",
  },
  {
    sitution: "Daily exercise or intense exercise 3-4 times/week",
    value: "level_4",
  },
  {
    sitution: "Intense exercise 6-7 times/week",
    value: "level_5",
  },
  {
    sitution: "Very intense exercise daily, or physical job",
    value: "level_6",
  },
];

export const bodyGoals = [
  {
    sitution: "Maintain weight",
    value: "maintain weight",
    apiValue: "maintain",
  },
  {
    sitution: "Mild weight loss (1 kg/month)",
    value: "Mild weight loss",
    apiValue: "mildlose",
  },
  {
    sitution: "Weight loss (2 kg/month)",
    value: "Weight loss",
    apiValue: "weightlose",
  },
  {
    sitution: "Extreme weight loss (4 kg/month)",
    value: "Extreme weight loss",
    apiValue: "extremelose",
  },
  {
    sitution: "Mild weight gain (1 kg/month)",
    value: "Mild weight gain",
    apiValue: "mildgain",
  },
  {
    sitution: "Weight gain (2 kg/month)",
    value: "Weight gain",
    apiValue: "weightgain",
  },
  {
    sitution: "Extreme weight gain (4 kg/month)",
    value: "Extreme weight gain",
    apiValue: "extremegain",
  },
];
