exports.calculateMacro = (req, res) => {
  const { height, weight, age, gender, activityLevel, goal } = req.query;

  const heightInMeters = height / 100;
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const dailyCalories = bmr * activityFactors[activityLevel];

  let adjustedCalories;
  switch (goal) {
    case "extremelose":
      adjustedCalories = dailyCalories - 1000;
      break;
    case "weightlose":
      adjustedCalories = dailyCalories - 500;
      break;
    case "mildlose":
      adjustedCalories = dailyCalories - 250;
      break;
    case "maintain":
      adjustedCalories = dailyCalories;
      break;
    case "mildgain":
      adjustedCalories = dailyCalories + 250;
      break;
    case "weightgain":
      adjustedCalories = dailyCalories + 500;
      break;
    case "extremegain":
      adjustedCalories = dailyCalories + 1000;
      break;
    default:
      adjustedCalories = dailyCalories;
  }

  const macroNeed = {
    balanced: {},
    highprotein: {},
    lowcarbs: {},
    lowfat: {},
  };

  const macroRatios = {
    balanced: { protein: 0.3, carbs: 0.45, fat: 0.25 },
    highprotein: { protein: 0.51, carbs: 0.38, fat: 0.11 },
    lowcarbs: { protein: 0.3, carbs: 0.2, fat: 0.5 },
    lowfat: { protein: 0.29, carbs: 0.61, fat: 0.1 },
  };

  Object.keys(macroRatios).forEach((goal) => {
    const goalCalories = adjustedCalories;
    const protein = ((goalCalories * macroRatios[goal].protein) / 4).toFixed(2);
    const carbs = ((goalCalories * macroRatios[goal].carbs) / 4).toFixed(2);
    const fat = ((goalCalories * macroRatios[goal].fat) / 9).toFixed(2);

    macroNeed[goal] = {
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calorie: parseFloat(goalCalories.toFixed(2)),
    };
  });

  res.json({ calorieNeed: adjustedCalories.toFixed(2), macroNeed });
};
