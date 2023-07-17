export const calculateMeasurements = (wrist, gender) => {
    let chest = Math.round(wrist * 6.5);
    let neck = Math.round(chest * 0.37);
    let arm = Math.round(chest * 0.36);
    let forearm = Math.round(chest * 0.29);
    let waist = Math.round(chest * 0.7);
    let hip = Math.round(chest * 0.85);
    let thigh = Math.round(chest * 0.53);
    let calve = Math.round(chest * 0.34);
    let shoulder = Math.round(waist * 1.61);

    if (gender === "male") {

        return { neck, shoulder, chest, arm, forearm, waist, hip, thigh, calve }

    } else if (gender === "female") {
        chest = Math.round(wrist * 6.3)
        hip = chest
        waist = Math.round(chest * 0.655)
        return { chest, waist, hip }
    }
}