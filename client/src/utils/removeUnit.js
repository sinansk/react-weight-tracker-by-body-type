export const removeUnit = (value) => {
    const unitRegex = /[^\d.-]+$/;
    const unit = value.match(unitRegex)[0];
    const number = parseFloat(value.replace(unitRegex, ""));
    return number
} 