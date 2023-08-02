export const removeUnit = (value) => {
    const regex = /\s*\d*\.?\d+\s*\D*/;
    const match = value.match(regex);
    if (match) {
        return parseFloat(match[0]);
    }
    return parseFloat(value);
};