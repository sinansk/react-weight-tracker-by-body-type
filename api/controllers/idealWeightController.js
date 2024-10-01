exports.calculateIdealWeight = (req, res) => {
  const { gender, height, bodyType } = req.query;

  let idealWeight;
  if (gender === "male") {
    idealWeight = 50 + 0.91 * (height - 152.4);
  } else {
    idealWeight = 45.5 + 0.91 * (height - 152.4);
  }
  if (bodyType === "Ectomorph") {
    idealWeight = idealWeight * 0.96;
  } else if (bodyType === "Endomorph") {
    idealWeight = idealWeight * 1.04;
  }

  res.json({ idealWeight: Math.round(idealWeight) });
};
