exports.idealMeasurements = (req, res) => {
  const { gender, wrist } = req.query;

  let chest;
  let neck;
  let arm;
  let forearm;
  let waist;
  let hip;
  let thigh;
  let calve;
  let shoulder;

  if (gender === "male") {
    chest = Math.round(wrist * 6.5);
    neck = Math.round(chest * 0.37);
    arm = Math.round(chest * 0.36);
    forearm = Math.round(chest * 0.29);
    waist = Math.round(chest * 0.7);
    hip = Math.round(chest * 0.85);
    thigh = Math.round(chest * 0.53);
    calve = Math.round(chest * 0.34);
    shoulder = Math.round(waist * 1.61);
  } else if (gender === "female") {
    chest = Math.round(wrist * 6);
    neck = Math.round(chest * 0.35);
    arm = Math.round(chest * 0.3);
    forearm = Math.round(chest * 0.255);
    waist = Math.round(chest * 0.66);
    hip = Math.round(chest * 1.05);
    thigh = Math.round(chest * 0.58);
    calve = Math.round(chest * 0.27);
    shoulder = Math.round(waist * 1.5);
  }
  const idealMeasurements = {
    neck,
    shoulder,
    chest,
    arm,
    forearm,
    waist,
    hip,
    thigh,
    calve,
    wrist,
  };
  res.json({
    idealMeasurements: idealMeasurements,
  });
};
