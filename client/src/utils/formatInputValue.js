export const formatInputValue = (value, unit) => {

    const trimmedValue = value.replace(unit, '')
        .replace(/[^0-9.,]/g, '')
        .replace(/,+/g, '.') // Replace multiple commas with a single dot
        .replace(/\.(?=.*\.)/g, ''); // Remove dots without a digit following
    const formattedValue = /^\d/.test(trimmedValue) ? trimmedValue : '';

    return formattedValue;
};