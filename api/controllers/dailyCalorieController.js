exports.calculateDailyCalorie = (req, res) => {
  const { gender, weight, height, age, activityLevel, bodyGoal } = req.query;

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

  const dailyCalories = Math.round(bmr * activityFactors[activityLevel]);

  const calorieNeed = {
    BMR: bmr.toFixed(2),
    goals: {
      "Extreme weight loss": {
        "loss weight": "1 kg",
        calory: dailyCalories - 1000,
      },
      "Weight loss": {
        "loss weight": "0.50 kg",
        calory: dailyCalories - 500,
      },
      "Mild weight loss": {
        "loss weight": "0.25 kg",
        calory: dailyCalories - 250,
      },
      "maintain weight": dailyCalories,
      "Mild weight gain": {
        "gain weight": "0.25 kg",
        calory: dailyCalories + 250,
      },
      "Weight gain": {
        "gain weight": "0.50 kg",
        calory: dailyCalories + 500,
      },
      "Extreme weight gain": {
        "gain weight": "1 kg",
        calory: dailyCalories + 1000,
      },
    },
  };

  res.json({ calorieNeed });
};
