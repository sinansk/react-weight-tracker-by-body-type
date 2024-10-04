exports.calculateBodyFat = (req, res) => {
  const { gender, weight, age } = req.query;
  const waist = parseFloat(req.query.waist);
  const hip = parseFloat(req.query.hip);
  const neck = parseFloat(req.query.neck);
  const height = parseFloat(req.query.height);

  if (!weight || !height || !age || !waist || !neck) {
    return res.status(400).json({ error: "There is missing query." });
  }
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  const bodyFatBMI =
    1.2 * bmi + 0.23 * age - 10.8 * (gender === "male" ? 1 : 0) - 5.4;

  let bodyFatNavy;
  if (gender === "male") {
    bodyFatNavy =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450;
  } else {
    bodyFatNavy =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waist + hip - neck) +
          0.221 * Math.log10(height)) -
      450;
  }

  const bodyFatMass = (bodyFatNavy / 100) * weight;
  const leanBodyMass = weight - bodyFatMass;

  let bodyFatCategory;
  if (bodyFatNavy < 6) {
    bodyFatCategory = "Essential fat";
  } else if (bodyFatNavy < 14) {
    bodyFatCategory = "Athletes";
  } else if (bodyFatNavy < 18) {
    bodyFatCategory = "Fitness";
  } else if (bodyFatNavy < 25) {
    bodyFatCategory = "Average";
  } else {
    bodyFatCategory = "Obese";
  }

  const bodyFat = {
    "Body Fat (BMI method)": bodyFatBMI.toFixed(2),
    "Body Fat Category": bodyFatCategory,
    "Body Fat Mass": bodyFatMass.toFixed(2),
    "Lean Body Mass": leanBodyMass.toFixed(2),
    "Body Fat (U.S. Navy Method)": bodyFatNavy.toFixed(2),
  };

  res.json({ bodyFat });
};
