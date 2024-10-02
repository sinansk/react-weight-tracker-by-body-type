exports.calculateIdealWeight = (req, res) => {
  const { height, weight, gender, bodyType } = req.query;

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  const devineFormula =
    gender === "male"
      ? 50 + 2.3 * (height / 2.54 - 60)
      : 45.5 + 2.3 * (height / 2.54 - 60);

  const robinsonFormula =
    gender === "male"
      ? 52 + 1.9 * (height / 2.54 - 60)
      : 49 + 1.7 * (height / 2.54 - 60);

  const millerFormula =
    gender === "male"
      ? 56.2 + 1.41 * (height / 2.54 - 60)
      : 53.1 + 1.36 * (height / 2.54 - 60);

  const hamwiFormula =
    gender === "male"
      ? 48 + 2.7 * (height / 2.54 - 60)
      : 45.5 + 2.2 * (height / 2.54 - 60);

  let idealWeights = [
    devineFormula,
    robinsonFormula,
    millerFormula,
    hamwiFormula,
  ].sort((a, b) => a - b);

  idealWeights = idealWeights.map((weight) => {
    if (bodyType === "Ectomorph") {
      return weight * 0.96;
    } else if (bodyType === "Endomorph") {
      return weight * 1.04;
    }
    return weight;
  });

  const idealWeightRange = {
    min: Math.round(idealWeights[0]),
    max: Math.round(idealWeights[idealWeights.length - 1]),
  };
  let idealWeightStatus;
  if (weight < idealWeightRange.min) {
    idealWeightStatus = `You need to gain ${idealWeightRange.min - weight} kg`;
  } else if (weight > idealWeightRange.max) {
    idealWeightStatus = `You need to loss ${weight - idealWeightRange.max} kg`;
  } else {
    idealWeightStatus = "Your weight is ideal.";
  }

  res.json({
    idealWeightRange: `${idealWeightRange.min} - ${idealWeightRange.max} kg`,
    idealWeightStatus: idealWeightStatus,
    details: {
      devineFormula: Math.round(idealWeights[0]),
      robinsonFormula: Math.round(idealWeights[1]),
      millerFormula: Math.round(idealWeights[2]),
      hamwiFormula: Math.round(idealWeights[3]),
    },
    bmi: bmi.toFixed(2),
  });
};
