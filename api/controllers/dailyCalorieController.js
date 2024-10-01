exports.calculateDailyCalorie = (req, res) => {
  const { gender, weight, height, age, activityLevel } = req.query;

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

  const calorieNeed = {
    BMR: bmr.toFixed(2),
    goals: {
      "Extreme weight loss": {
        "loss weight": "1 kg",
        calory: (dailyCalories - 1000).toFixed(2),
      },
      "Weight loss": {
        "loss weight": "0.50 kg",
        calory: (dailyCalories - 500).toFixed(2),
      },
      "Mild weight loss": {
        "loss weight": "0.25 kg",
        calory: (dailyCalories - 250).toFixed(2),
      },
      "maintain weight": dailyCalories.toFixed(2),
      "Mild weight gain": {
        "gain weight": "0.25 kg",
        calory: (dailyCalories + 250).toFixed(2),
      },
      "Weight gain": {
        "gain weight": "0.50 kg",
        calory: (dailyCalories + 500).toFixed(2),
      },
      "Extreme weight gain": {
        "gain weight": "1 kg",
        calory: (dailyCalories + 1000).toFixed(2),
      },
    },
  };

  res.json({ calorieNeed });
};
